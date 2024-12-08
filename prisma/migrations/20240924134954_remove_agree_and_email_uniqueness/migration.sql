/*
  Warnings:

  - You are about to drop the column `agree` on the `Contact` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Contact_email_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "agree";
