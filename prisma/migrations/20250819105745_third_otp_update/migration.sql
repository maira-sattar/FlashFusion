/*
  Warnings:

  - You are about to alter the column `code` on the `otp` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `otp` MODIFY `code` INTEGER NOT NULL;
