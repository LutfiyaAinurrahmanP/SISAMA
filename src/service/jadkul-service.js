import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation/validation.js";
import { getJadkulValidation, registerJadkulValidation } from "../validation/jadkul-validation";

const register = async (matkul, dosen, request) => {
    const registerValidate = validate(registerJadkulValidation, request);
    registerValidate.mata_kuliah_id = matkul.id;
    registerValidate.dosen_id = dosen.id;

    return prismaClient.jadwalKuliah.create({
        data: registerValidate,
        select: {
            id: true,
            mata_kuliah_id: true,
            dosen_id: true,
            hari: true,
            jam_mulai: true,
            jam_selesai: true,
            ruangan: true,
        },
    });
};

const get = async (request) => {
    const getValidate = validate(getJadkulValidation, request);
    const jadkul = await prismaClient.jadwalKuliah.findUnique({
        where: {
            id: getValidate.id
        },
        select: {
            id: true,
            mata_kuliah_id: true,
            dosen_id: true,
            hari: true,
            jam_mulai: true,
            jam_selesai: true,
            ruangan: true,
        }
    });
    if (!jadkul) {
        throw new ResponseError(404, "Jadwal Kuliah is not found");
    }
    return jadkul;
};

const getMany = async (request) => {
    const jadkul = await prismaClient.jadwalKuliah.findMany({
        select: {
            id: true,
            mata_kuliah_id: true,
            dosen_id: true,
            hari: true,
            jam_mulai: true,
            jam_selesai: true,
            ruangan: true,
        }
    });

    if(!jadkul){
        throw new ResponseError(404, "Jadwal Kuliah is not found");
    }

    return jadkul;
}

export default {
    register,
    get,
    getMany
};
