import { prismaClient } from "../src/application/database";

const removeMatkul = async () => {
    await prismaClient.mataKuliah.deleteMany({
        where: {
            kode_mk: "test"
        }
    })
};

const removeMatkulUpdate = async () => {
    await prismaClient.mataKuliah.deleteMany({
        where: {
            kode_mk: "update"
        }
    })
};

const getMatkulId = async () => {
    const matkul = await prismaClient.mataKuliah.findFirst({
        select: {
            id: true
        }
    });
    return matkul?.id;
};

const createMatkul = async () => {
    const matkul = await prismaClient.mataKuliah.create({
        data: {
            kode_mk: "test",
            nama_mk: "test",
            sks: "2"
        },
        select: {
            id: true
        }
    });
    return matkul;
};

const createManyMatkul = async () => {
    const matkulData = [
        { kode_mk: "MK001", nama_mk: "Matematika Dasar", sks: "3" },
        { kode_mk: "MK002", nama_mk: "Fisika Dasar", sks: "3" },
        { kode_mk: "MK003", nama_mk: "Kimia Dasar", sks: "3" },
        { kode_mk: "MK004", nama_mk: "Pemrograman 1", sks: "4" },
        { kode_mk: "MK005", nama_mk: "Algoritma dan Struktur Data", sks: "4" },
        { kode_mk: "MK006", nama_mk: "Basis Data", sks: "3" },
        { kode_mk: "MK007", nama_mk: "Sistem Operasi", sks: "3" },
        { kode_mk: "MK008", nama_mk: "Jaringan Komputer", sks: "3" },
        { kode_mk: "MK009", nama_mk: "Rekayasa Perangkat Lunak", sks: "4" },
        { kode_mk: "MK010", nama_mk: "Kecerdasan Buatan", sks: "3" },
        { kode_mk: "MK011", nama_mk: "Pemrograman Web", sks: "3" },
        { kode_mk: "MK012", nama_mk: "Pemrograman Mobile", sks: "3" },
        { kode_mk: "MK013", nama_mk: "Matematika Lanjut", sks: "3" },
        { kode_mk: "MK014", nama_mk: "Manajemen Proyek TI", sks: "3" },
        { kode_mk: "MK015", nama_mk: "Keamanan Informasi", sks: "3" },
        { kode_mk: "MK016", nama_mk: "Cloud Computing", sks: "3" },
        { kode_mk: "MK017", nama_mk: "Data Mining", sks: "3" },
        { kode_mk: "MK018", nama_mk: "Analisis Data", sks: "3" },
        { kode_mk: "MK019", nama_mk: "Statistika", sks: "3" },
        { kode_mk: "MK020", nama_mk: "Machine Learning", sks: "3" },
        { kode_mk: "MK021", nama_mk: "Etika Profesi", sks: "2" },
        { kode_mk: "MK022", nama_mk: "Tugas Akhir", sks: "6" }
    ];

    await prismaClient.mataKuliah.createMany({
        data: matkulData,
    });
};

const removeManyMatkul = async () => {
    await prismaClient.mataKuliah.deleteMany({})
};



export {
    removeMatkul,
    getMatkulId,
    createMatkul,
    createManyMatkul,
    removeManyMatkul,
    removeMatkulUpdate
};