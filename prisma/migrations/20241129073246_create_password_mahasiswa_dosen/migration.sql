/*
  Warnings:

  - Added the required column `password` to the `dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dosen` ADD COLUMN `password` VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE `mahasiswa` ADD COLUMN `password` VARCHAR(64) NOT NULL;
