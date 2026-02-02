import { type cad, Feature, type User } from "@prisma/client";
import { LICENSE_SCHEMA } from "@snailycad/schemas";
import { UseBeforeEach, Context, BodyParams, PathParams } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Forbidden, NotFound } from "@tsed/exceptions";
import { ContentType, Description, Put } from "@tsed/schema";
import { canManageInvariant } from "lib/auth/getSessionUser";
import { prisma } from "lib/data/prisma";
import { validateSchema } from "lib/data/validate-schema";
import { IsAuth } from "middlewares/auth/is-auth";
import { isFeatureEnabled } from "lib/upsert-cad";
import { shouldCheckCitizenUserId } from "lib/citizen/has-citizen-access";
import type * as APITypes from "@snailycad/types/api";
import { citizenInclude } from "./CitizenController";
import { IsFeatureEnabled } from "middlewares/is-enabled";

@Controller("/licenses")
@UseBeforeEach(IsAuth)
@ContentType("application/json")
@IsFeatureEnabled({ feature: Feature.ALLOW_CITIZEN_UPDATE_LICENSE })
export class LicensesController {
  @Put("/:id")
  @Description("Update the licenses of a citizen")
  async updateCitizenLicenses(
    @PathParams("id") citizenId: string,
    @Context("user") user: User,
    @Context("cad") cad: cad & { features?: Record<Feature, boolean> },
    @BodyParams() body: unknown,
  ): Promise<APITypes.PutCitizenLicensesByIdData> {
    const data = validateSchema(LICENSE_SCHEMA, body);

    const isLicenseExamsEnabled = isFeatureEnabled({
      features: cad.features,
      feature: Feature.LICENSE_EXAMS,
      defaultReturn: false,
    });

    if (isLicenseExamsEnabled) {
      throw new Forbidden("citizenNotAllowedToEditLicenses");
    }

    const citizen = await prisma.citizen.findUnique({
      where: { id: citizenId },
      include: { suspendedLicenses: true },
    });

    const checkCitizenUserId = shouldCheckCitizenUserId({ cad, user });
    if (checkCitizenUserId) {
      canManageInvariant(citizen?.userId, user, new NotFound("notFound"));
    } else if (!citizen) {
      throw new NotFound("citizenNotFound");
    }

    const defaultLicenseValue = await prisma.value.findFirst({
      where: { isDefault: true, type: "LICENSE" },
    });
    const defaultId = defaultLicenseValue?.id ?? null;
    const suspended = citizen.suspendedLicenses;

    const updated = await prisma.citizen.update({
      where: { id: citizen.id },
      data: {
        driversLicenseId: suspended?.driverLicense ? undefined : (data.hasDriversLicense ? defaultId : null),
        pilotLicenseId: suspended?.pilotLicense ? undefined : (data.hasPilotLicense ? defaultId : null),
        weaponLicenseId: suspended?.firearmsLicense ? undefined : (data.hasWeaponLicense ? defaultId : null),
        waterLicenseId: suspended?.waterLicense ? undefined : (data.hasWaterLicense ? defaultId : null),
        fishingLicenseId: suspended?.fishingLicense ? undefined : (data.hasFishingLicense ? defaultId : null),
        huntingLicenseId: suspended?.huntingLicense ? undefined : (data.hasHuntingLicense ? defaultId : null),
        lawyerLicenseId: data.hasLawyerLicense ? defaultId : null,
        medicalLicenseId: data.hasMedicalLicense ? defaultId : null,
        businessLicenseId: data.hasBusinessLicense ? defaultId : null,
        taxiLicenseId: data.hasTaxiLicense ? defaultId : null,
        alcoholLicenseId: data.hasAlcoholLicense ? defaultId : null,
        securityLicenseId: data.hasSecurityLicense ? defaultId : null,
        substanceLicenseId: data.hasSubstanceLicense ? defaultId : null,
      },
      include: citizenInclude,
    });

    return updated;
  }
}
