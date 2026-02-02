import { type Citizen } from "@snailycad/types";
import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import { SwitchField } from "@snailycad/ui";
import type { LicenseInitialValues } from "./manage-licenses-modal";

export function createDefaultLicensesValues(citizen: Citizen | null): LicenseInitialValues {
  return {
    hasDriversLicense: !!citizen?.driversLicenseId,
    hasPilotLicense: !!citizen?.pilotLicenseId,
    hasWeaponLicense: !!citizen?.weaponLicenseId,
    hasWaterLicense: !!citizen?.waterLicenseId,
    hasFishingLicense: !!citizen?.fishingLicenseId,
    hasHuntingLicense: !!citizen?.huntingLicenseId,
    hasLawyerLicense: !!citizen?.lawyerLicenseId,
    hasMedicalLicense: !!citizen?.medicalLicenseId,
    hasBusinessLicense: !!citizen?.businessLicenseId,
    hasTaxiLicense: !!citizen?.taxiLicenseId,
    hasAlcoholLicense: !!citizen?.alcoholLicenseId,
    hasSecurityLicense: !!citizen?.securityLicenseId,
    hasSubstanceLicense: !!citizen?.substanceLicenseId,
  };
}

interface Props {
  isLeo?: boolean;
  allowRemoval?: boolean;
}

export function ManageLicensesFormFields({}: Props) {
  const { values, setFieldValue } =
    useFormikContext<ReturnType<typeof createDefaultLicensesValues>>();
  const t = useTranslations("Citizen");

  const licenses = [
    { key: "hasDriversLicense", label: t("driversLicense") },
    { key: "hasPilotLicense", label: t("pilotLicense") },
    { key: "hasWeaponLicense", label: t("weaponLicense") },
    { key: "hasWaterLicense", label: t("waterLicense") },
    { key: "hasFishingLicense", label: t("fishingLicense") },
    { key: "hasHuntingLicense", label: t("huntingLicense") },
    { key: "hasLawyerLicense", label: t("lawyerLicense") },
    { key: "hasMedicalLicense", label: t("medicalLicense") },
    { key: "hasBusinessLicense", label: t("businessLicense") },
    { key: "hasTaxiLicense", label: t("taxiLicense") },
    { key: "hasAlcoholLicense", label: t("alcoholLicense") },
    { key: "hasSecurityLicense", label: t("securityLicense") },
    { key: "hasSubstanceLicense", label: t("substanceLicense") },
  ] as const;

  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {licenses.map(({ key, label }) => (
        <SwitchField
          key={key}
          isSelected={values[key]}
          onChange={(v) => setFieldValue(key, v)}
        >
          {label}
        </SwitchField>
      ))}
    </div>
  );
}
