/*
  Warnings:

  - You are about to drop the column `user_id` on the `otp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `Otp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `Otp_user_id_fkey`;

-- DropIndex
DROP INDEX `Otp_user_id_key` ON `otp`;

-- AlterTable
ALTER TABLE `otp` DROP COLUMN `user_id`,
    ADD COLUMN `user_email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Otp_user_email_key` ON `Otp`(`user_email`);

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
