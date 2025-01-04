import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation/validation";
import { getManyMatkulValidation, getMatkulValidation, registerMatkulValidation } from "../validation/matkul-validation";

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
};

const get = async (request) => {
    const getValidate = validate(getMatkulValidation, request);
    const matkul = await prismaClient.mataKuliah.findUnique({
        where: {
            id: getValidate.id
        },
        select: {
            id: true,
            kode_mk: true,
            nama_mk: true,
            sks: true
        }
    });

    if (!matkul) {
        throw new ResponseError(404, "Mata kuliah data is not found");
    };

    return matkul;
}

const getMany = async () => {
    const matkul = await prismaClient.mataKuliah.findMany({
        select: {
            id: true,
            kode_mk: true,
            nama_mk: true,
            sks: true
        }
    });

    if(!matkul){
        throw new ResponseError(404, "Mata kuliah data is not found")
    };

    return matkul;
}

export default {
    register,
    get,
    getMany
}