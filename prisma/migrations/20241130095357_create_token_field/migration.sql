-- AlterTable
ALTER TABLE `admin` ADD COLUMN `token` VARCHAR(64) NULL;

-- AlterTable
ALTER TABLE `dosen` ADD COLUMN `token` VARCHAR(64) NULL;

-- AlterTable
ALTER TABLE `mahasiswa` ADD COLUMN `token` VARCHAR(64) NULL;
