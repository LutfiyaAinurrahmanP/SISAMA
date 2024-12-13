// import { validate } from "uuid"
import { getDosenValidation } from "../validation/dosen-validation.js"
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getMataKuliahValidation } from "../validation/matkul-validation.js";
import { registerJadwalKuliahValidation } from "../validation/jadkul-validation.js";
import { validate } from "../validation/validation.js";

const register = async (requestDosen, requestMatkul, request) => {
    const requestRegister = validate(registerJadwalKuliahValidation, request);
    requestRegister.mata_kuliah_id = requestMatkul.id;
    requestRegister.dosen_id = requestDosen.id;

    return prismaClient.jadwalKuliah.create({
        data: requestRegister,
        select: {
            id: true,
            hari: true,
            jam_mulai: true,
            jam_selesai: true,
            mata_kuliah_id: true,
            ruangan: true,
        },
    });
};

export default {
    register
}
