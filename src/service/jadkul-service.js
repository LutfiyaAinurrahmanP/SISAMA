import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation/validation";
import { registerJadkulValidation } from "../validation/jadkul-validation";

const register = async (request) => {
    const registerValidate = validate(registerJadkulValidation, request);

    // Cari mata_kuliah_id berdasarkan nama_mk
    const matkul = await prismaClient.mataKuliah.findUnique({
        where: {
            nama_mk: registerValidate.nama_mk,
        },
    });

    if (!matkul) {
        throw new ResponseError(400, "Mata kuliah tidak ditemukan");
    }

    // Cari dosen_id berdasarkan nama
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            nama: registerValidate.nama,
        },
    });

    if (!dosen) {
        throw new ResponseError(400, "Dosen tidak ditemukan");
    }

    // Tambahkan ID yang ditemukan ke data jadwal kuliah
    registerValidate.mata_kuliah_id = matkul.id;
    registerValidate.dosen_id = dosen.id;

    // Simpan jadwal kuliah
    return prismaClient.jadwalKuliah.create({
        data: {
            mata_kuliah_id: registerValidate.mata_kuliah_id,
            dosen_id: registerValidate.dosen_id,
            hari: registerValidate.hari,
            jam_mulai: registerValidate.jam_mulai,
            jam_selesai: registerValidate.jam_selesai,
            ruangan: registerValidate.ruangan,
        },
        select: {
            hari: true,
            jam_mulai: true,
            jam_selesai: true,
            ruangan: true,
        },
    });
};

export default { register };
