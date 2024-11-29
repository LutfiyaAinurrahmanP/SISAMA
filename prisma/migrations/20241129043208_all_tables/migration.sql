-- CreateTable
CREATE TABLE `mahasiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nim` VARCHAR(64) NOT NULL,
    `nama` VARCHAR(64) NOT NULL,
    `prodi` VARCHAR(64) NOT NULL,
    `angkatan` VARCHAR(64) NOT NULL,
    `email` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `mahasiswa_nim_key`(`nim`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `dosen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(64) NOT NULL,
    `nama` VARCHAR(64) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `jabatan` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `dosen_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `mata_kuliah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_mk` VARCHAR(64) NOT NULL,
    `nama_mk` VARCHAR(64) NOT NULL,
    `sks` INTEGER NOT NULL,

    UNIQUE INDEX `mata_kuliah_kode_mk_key`(`kode_mk`),
    UNIQUE INDEX `mata_kuliah_nama_mk_key`(`nama_mk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `jadwal_kuliah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mata_kuliah_id` INTEGER NOT NULL,
    `dosen_id` INTEGER NOT NULL,
    `hari` VARCHAR(64) NOT NULL,
    `jam_mulai` VARCHAR(64) NOT NULL,
    `jam_selesai` VARCHAR(64) NOT NULL,
    `ruangan` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `absensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jadwal_id` INTEGER NOT NULL,
    `mahasiswa_id` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `status` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `jadwal_kuliah` ADD CONSTRAINT `jadwal_kuliah_mata_kuliah_id_fkey` FOREIGN KEY (`mata_kuliah_id`) REFERENCES `mata_kuliah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_kuliah` ADD CONSTRAINT `jadwal_kuliah_dosen_id_fkey` FOREIGN KEY (`dosen_id`) REFERENCES `dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_jadwal_id_fkey` FOREIGN KEY (`jadwal_id`) REFERENCES `jadwal_kuliah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_mahasiswa_id_fkey` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
