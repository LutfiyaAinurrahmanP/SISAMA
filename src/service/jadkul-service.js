import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation/validation";
import { registerJadkulValidation } from "../validation/jadkul-validation";

const getAllMatkul = async () => {
    const matkul = await prismaClient.mataKuliah.findMany({
        select: {
            id: true,
            kode_mk: true,
            nama_mk: true,
            sks: true
        },
    });
    if (matkul.length === 0) {
        throw new ResponseError(404, "Mata kuliah data is not found");
    }
    return matkul;
};

const getAllDosen = async () => {
    const dosen = await prismaClient.dosen.findMany({
        select: {
            id: true,
            nip: true,
            nama: true,
            email: true,
            jabatan: true,
        }
    });
    if (dosen.length === 0) {
        throw new ResponseError(404, "Dosen data is not found");
    }
    return dosen;
};

const register = async (matkulId, dosenId, request) => {
    const matkul = await prismaClient.mataKuliah.findUnique({
        where: { id: matkulId }
    });
    if (!matkul) {
        throw new ResponseError(404, "Mata kuliah not found");
    }

    const dosen = await prismaClient.dosen.findUnique({
        where: { id: dosenId }
    });
    if (!dosen) {
        throw new ResponseError(404, "Dosen not found");
    }

    const registerValidate = validate(registerJadkulValidation, request);
    registerValidate.matkul_id = matkul.id;
    registerValidate.dosen_id = dosen.id;

    const jadkulExists = await prismaClient.jadwalKuliah.count({
        where: {
            matkul_id: matkul.id,
            dosen_id: dosen.id,
            hari: registerValidate.hari,
            jam_mulai: registerValidate.jam_mulai
        }
    });

    if (jadkulExists > 0) {
        throw new ResponseError(409, "Jadwal kuliah already exists");
    }

    return prismaClient.jadwalKuliah.create({
        data: registerValidate,
        select: {
            id: true,
            mata_kuliah_id: true,
            dosen_id: true,
            hari: true,
            jam_mulai: true,
            jam_selesai: true,
            ruangan: true
        }
    });
};

export default {
    getAllMatkul,
    getAllDosen,
    register
};
