import { type Citizen } from "@snailycad/types";
import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import { FormRow, DatePickerField, SwitchField } from "@snailycad/ui";
import type { LicenseInitialValues } from "./manage-licenses-modal";

export function createDefaultLicensesValues(citizen: Citizen | null): LicenseInitialValues {
  return {
    suspended: {
      driverLicense: citizen?.suspendedLicenses?.driverLicense ?? false,
      driverLicenseTimeEnd: citizen?.suspendedLicenses?.driverLicenseTimeEnd ?? null,
      pilotLicense: citizen?.suspendedLicenses?.pilotLicense ?? false,
      pilotLicenseTimeEnd: citizen?.suspendedLicenses?.pilotLicenseTimeEnd ?? null,
      firearmsLicense: citizen?.suspendedLicenses?.firearmsLicense ?? false,
      firearmsLicenseTimeEnd: citizen?.suspendedLicenses?.firearmsLicenseTimeEnd ?? null,
      waterLicense: citizen?.suspendedLicenses?.waterLicense ?? false,
      waterLicenseTimeEnd: citizen?.suspendedLicenses?.waterLicenseTimeEnd ?? null,
      huntingLicense: citizen?.suspendedLicenses?.huntingLicense ?? false,
      huntingLicenseTimeEnd: citizen?.suspendedLicenses?.huntingLicenseTimeEnd ?? null,
      fishingLicense: citizen?.suspendedLicenses?.fishingLicense ?? false,
      fishingLicenseTimeEnd: citizen?.suspendedLicenses?.fishingLicenseTimeEnd ?? null,
    },
    hasDriversLicense: !!citizen?.driversLicenseId,
    hasPilotLicense: !!citizen?.pilotLicenseId,
    hasWeaponLicense: !!citizen?.weaponLicenseId,
    hasWaterLicense: !!citizen?.waterLicenseId,
    hasFishingLicense: !!citizen?.fishingLicenseId,
    hasHuntingLicense: !!citizen?.huntingLicenseId,
  };
}

interface Props {
  isLeo?: boolean;
  allowRemoval?: boolean;
}

export function ManageLicensesFormFields({ isLeo }: Props) {
  const { values, setFieldValue, errors } =
    useFormikContext<ReturnType<typeof createDefaultLicensesValues>>();
  const t = useTranslations();

  const licenses = [
    { key: "hasDriversLicense", label: t("Citizen.driversLicense"), suspendKey: "driverLicense" },
    { key: "hasPilotLicense", label: t("Citizen.pilotLicense"), suspendKey: "pilotLicense" },
    { key: "hasWeaponLicense", label: t("Citizen.weaponLicense"), suspendKey: "firearmsLicense" },
    { key: "hasWaterLicense", label: t("Citizen.waterLicense"), suspendKey: "waterLicense" },
    { key: "hasFishingLicense", label: t("Citizen.fishingLicense"), suspendKey: "fishingLicense" },
    { key: "hasHuntingLicense", label: t("Citizen.huntingLicense"), suspendKey: "huntingLicense" },
  ] as const;

  return (
    <div className="mt-3">
      {licenses.map(({ key, label, suspendKey }) => (
        <section key={key} className="mb-4">
          {isLeo ? (
            <FormRow>
              <SwitchField
                isSelected={values.suspended[suspendKey]}
                onChange={(v) => setFieldValue(`suspended.${suspendKey}`, v)}
              >
                {t(`Leo.suspend${suspendKey.charAt(0).toUpperCase() + suspendKey.slice(1)}`)}
              </SwitchField>
              {values.suspended[suspendKey] && (
                <DatePickerField
                  isOptional
                  label={t("Leo.endDate")}
                  value={values.suspended[`${suspendKey}TimeEnd` as keyof typeof values.suspended] as Date | undefined}
                  onChange={(v) => setFieldValue(`suspended.${suspendKey}TimeEnd`, v?.toDate("UTC"))}
                />
              )}
            </FormRow>
          ) : null}

          <SwitchField
            isSelected={values[key]}
            isDisabled={values.suspended[suspendKey]}
            onChange={(v) => setFieldValue(key, v)}
          >
            {label}
          </SwitchField>

          {!isLeo && values.suspended[suspendKey] && (
            <p className="text-sm text-neutral-700 dark:text-gray-400 mt-1">
              {t("Citizen.licenseSuspendedInfo")}
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
