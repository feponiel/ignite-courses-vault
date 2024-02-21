/*
  Warnings:

  - The `care` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cep` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manager` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appropriate_environment` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presentation` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PetAdaptedClimate" ADD VALUE 'TEMPERATE';

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "manager" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "appropriate_environment" TEXT NOT NULL,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "presentation" TEXT NOT NULL,
DROP COLUMN "care",
ADD COLUMN     "care" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
