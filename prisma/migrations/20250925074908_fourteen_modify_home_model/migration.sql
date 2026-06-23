/*
  Warnings:

  - Added the required column `updatedAt` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `home` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `sub_title` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `productcategory` ADD COLUMN `homeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
