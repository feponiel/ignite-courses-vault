/*
  Warnings:

  - Changed the type of `independence_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PetIndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "independence_level",
ADD COLUMN     "independence_level" "PetIndependenceLevel" NOT NULL;
