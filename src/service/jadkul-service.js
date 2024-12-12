import { validate } from "uuid"
import { getDosenValidation } from "../validation/dosen-validation.js"
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getMataKuliahValidation } from "../validation/matkul-validation.js";
import { registerJadwalKuliahValidation } from "../validation/jadkul-validation.js";

const dosenData = async (request) => {
    const requestDosen = await validate(getDosenValidation, request);
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            id: requestDosen.id
        },
        select: {
            id: true,
            nip: true,
            nama: true,
            email: true,
            jabatan: true,
        }
    });
    if (!dosen) {
        throw new ResponseError(404, "Dosen data is not found")
    };
    return dosen
};

const matkulData = async (request) => {
    const requestMatkul = await validate(getMataKuliahValidation, request);
    const matkul = await prismaClient.mataKuliah.findUnique({
        where: {
            id: requestMatkul.id
        },
        select: {
            id: true,
            kode_mk: true,
            nama_mk: true,
            sks: true
        }
    });

    if (!matkul) {
        throw new ResponseError(404, "Mata Kuliah is not found");
    };

    return matkul;
};

const register = async (requestDosen, requestMatkul, request) => {
    const matkul = await matkulData(requestMatkul);
    const dosen = await dosenData(requestDosen);
    const requestRegister = await validate(registerJadwalKuliahValidation, request);

    const jadkul = await prismaClient.jadwalKuliah.findFirst({
        where: {
            dosen_id: dosen.id,
            mata_kuliah_id: matkul.id,
            hari: requestRegister.hari,
            jam_mulai: requestRegister.jam_mulai,
        }
    });

    if (jadkul) {
        throw new ResponseError(400, "Jadwal kuliah already exists");
    };

    return prismaClient.jadwalKuliah.create({
        data: {
            mata_kuliah_id: matkul.id,
            dosen_id: dosen.id,
            hari: requestRegister.hari,
            jam_mulai: requestRegister.jam_mulai,
            jam_selesai: requestRegister.jam_selesai,
            ruangan: requestRegister.ruangan,
        },
        select: {
            id: true,
            mata_kuliah_id: true,
            dosen_id: true,
            hari: true,
            jam_mulai: true,
            jam_selesai: true,
            ruangan: true
        },
        // include: {
        //     jadwalmatkul: true,
        //     jadwaldosen: true
        // }
    });
};

export default {
    register
}