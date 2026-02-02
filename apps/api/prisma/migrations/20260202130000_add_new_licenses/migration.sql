-- AlterTable
ALTER TABLE "Citizen" ADD COLUMN "lawyerLicenseId" TEXT;
ALTER TABLE "Citizen" ADD COLUMN "medicalLicenseId" TEXT;
ALTER TABLE "Citizen" ADD COLUMN "substanceLicenseId" TEXT;
ALTER TABLE "Citizen" ADD COLUMN "businessLicenseId" TEXT;
ALTER TABLE "Citizen" ADD COLUMN "taxiLicenseId" TEXT;
ALTER TABLE "Citizen" ADD COLUMN "alcoholLicenseId" TEXT;
ALTER TABLE "Citizen" ADD COLUMN "securityLicenseId" TEXT;

-- AddForeignKey
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_lawyerLicenseId_fkey" FOREIGN KEY ("lawyerLicenseId") REFERENCES "Value"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_medicalLicenseId_fkey" FOREIGN KEY ("medicalLicenseId") REFERENCES "Value"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_substanceLicenseId_fkey" FOREIGN KEY ("substanceLicenseId") REFERENCES "Value"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_businessLicenseId_fkey" FOREIGN KEY ("businessLicenseId") REFERENCES "Value"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_taxiLicenseId_fkey" FOREIGN KEY ("taxiLicenseId") REFERENCES "Value"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_alcoholLicenseId_fkey" FOREIGN KEY ("alcoholLicenseId") REFERENCES "Value"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_securityLicenseId_fkey" FOREIGN KEY ("securityLicenseId") REFERENCES "Value"("id") ON DELETE SET NULL ON UPDATE CASCADE;
