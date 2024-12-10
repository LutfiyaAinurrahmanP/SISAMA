import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerMataKuliahValidation } from "../validation/matkul-validation.js"
import { validate } from "../validation/validation.js";

const register = async (request) => {
    const requestRegister = await validate(registerMataKuliahValidation, request);
    const matkul = await prismaClient.mataKuliah.count({
        where: {
            id: requestRegister.id
        }
    });

    if (matkul === 1) {
        throw new ResponseError(400, "Mata Kuliah already registered")
    };

    await prismaClient.mataKuliah.create({
        data: requestRegister,
        select: {
            kode_mk: true,
            nama_mk: true,
            sks: true
        }
    })
}

export default {
    register
}