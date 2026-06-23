/*
  Warnings:

  - You are about to drop the column `productCategoryId` on the `image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productCatId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_productCategoryId_fkey`;

-- DropIndex
DROP INDEX `Image_productCategoryId_fkey` ON `image`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `productCategoryId`,
    ADD COLUMN `productCatId` INTEGER NULL,
    ADD COLUMN `productId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Image_productCatId_key` ON `Image`(`productCatId`);

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productCatId_fkey` FOREIGN KEY (`productCatId`) REFERENCES `ProductCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
