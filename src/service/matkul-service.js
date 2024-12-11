import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getManyMataKuliahValidation, getMataKuliahValidation, registerMataKuliahValidation, removeMataKuliahValidation, searchMataKuliahValidation, updateMataKuliahValidation } from "../validation/matkul-validation.js"
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

    return prismaClient.mataKuliah.create({
        data: requestRegister,
        select: {
            kode_mk: true,
            nama_mk: true,
            sks: true
        }
    })
}

const get = async (request) => {
    const requestGet = await validate(getMataKuliahValidation, request);
    const matkul = await prismaClient.mataKuliah.findUnique({
        where: {
            id: requestGet.id
        },
        select: {
            id: true,
            kode_mk: true,
            nama_mk: true,
            sks: true
        }
    });

    if (!matkul) {
        throw new ResponseError(404, `Mata kuliah not found`)
    }

    return matkul;
}

const getMany = async (request) => {
    const requestGetMany = await validate(getManyMataKuliahValidation, request);
    const matkul = await prismaClient.mataKuliah.findMany({
        where: {
            id: requestGetMany.id
        },
        select: {
            id: true,
            kode_mk: true,
            nama_mk: true,
            sks: true
        }
    });

    if (!matkul) {
        throw new ResponseError(404, "Mata Kuliah not found");
    };

    return matkul;
};

const update = async (request) => {
    const requestUpdate = await validate(updateMataKuliahValidation, request);
    const matkul = await prismaClient.mataKuliah.findUnique({
        where: {
            id: requestUpdate.id
        },
    });

    if (!matkul) {
        throw new ResponseError(404, "Mata kuliah not found");
    };

    return prismaClient.mataKuliah.update({
        where: {
            id: requestUpdate.id
        },
        data: {
            kode_mk: requestUpdate.kode_mk,
            nama_mk: requestUpdate.nama_mk,
            sks: requestUpdate.sks
        },
        select: {
            id: true,
            kode_mk: true,
            nama_mk: true,
            sks: true
        }
    });
};

const remove = async (request) => {
    const requestRemove = await validate(removeMataKuliahValidation, request);
    const matkul = await prismaClient.mataKuliah.findUnique({
        where: {
            id: requestRemove.id
        }
    });

    if (!matkul) {
        throw new ResponseError(404, "Mata kuliah is not found");
    };

    return prismaClient.mataKuliah.delete({
        where: {
            id: requestRemove.id
        }
    })
};

export default {
    register,
    get,
    getMany,
    update,
    remove,
}