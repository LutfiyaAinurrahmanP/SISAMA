/*
  Warnings:

  - A unique constraint covering the columns `[sks]` on the table `mata_kuliah` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `mata_kuliah` MODIFY `sks` VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `mata_kuliah_sks_key` ON `mata_kuliah`(`sks`);
