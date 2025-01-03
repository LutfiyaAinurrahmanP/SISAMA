import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation/validation";
import { registerMatkulValidation } from "../validation/matkul-validation";

const register = async (request) => {
    const registerValidate = validate(registerMatkulValidation, request);
    const matkul = await prismaClient.mataKuliah.count({
        where: {
            id: registerValidate.id
        }
    });

    if (matkul === 1) {
        throw new ResponseError(400, "Mata kuliah already exists")
    };

    return prismaClient.mataKuliah.create({
        data: registerValidate,
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