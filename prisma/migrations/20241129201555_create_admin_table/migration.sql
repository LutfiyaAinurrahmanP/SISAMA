-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL,
    `username` VARCHAR(64) NOT NULL,
    `password` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
