import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js"
import { getMahasiswaValidation, loginMahasiswaValidation, logoutMahasiswaValidation, registerMahasiswaValidation, removeMahasiswaValidation, updateMahasiswaValidation } from "../validation/mahasiswa-validation.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const registerValidate = validate(registerMahasiswaValidation, request);
    const mahasiswa = await prismaClient.mahasiswa.count({
        where: {
            id: registerValidate.id
        }
    });
    if (mahasiswa === 1) {
        throw new ResponseError(400, "nim already exists");
    }

    registerValidate.password = await bcrypt.hash(registerValidate.password, 10);

    return prismaClient.mahasiswa.create({
        data: registerValidate,
        select: {
            id: true,
            nim: true,
            nama: true,
            prodi: true,
            angkatan: true,
            email: true
        }
    })
};

const login = async (request) => {
    const loginValidate = validate(loginMahasiswaValidation, request);
    const mahasiswa = await prismaClient.mahasiswa.findUnique({
        where: {
            nim: loginValidate.nim
        },
        select: {
            nim: true,
            password: true
        }
    });
    if (!mahasiswa) {
        throw new ResponseError(401, "NIM or Password is wrong");
    }
    const isPasswordValid = await bcrypt.compare(loginValidate.password, mahasiswa.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "NIM or Password is wrong");
    }
    const token = uuid().toString();
    return prismaClient.mahasiswa.update({
        data: {
            token: token
        },
        where: {
            nim: mahasiswa.nim
        },
        select: {
            token: true
        }
    })
}

const get = async (request) => {
    const getValidate = validate(getMahasiswaValidation, request);
    const mahasiswa = await prismaClient.mahasiswa.findUnique({
        where: {
            id: getValidate
        },
        select: {
            id: true,
            nim: true,
            nama: true,
            prodi: true,
            angkatan: true,
            email: true
        }
    });
    if (!mahasiswa) {
        throw new ResponseError(404, `Mahasiswa is not found`);
    }
    return mahasiswa;
}

const update = async (request) => {
    const updateValidate = await validate(updateMahasiswaValidation, request);
    const mahasiswa = await prismaClient.mahasiswa.findUnique({
        where: {
            id: updateValidate.id
        }
    });
    if (!mahasiswa) {
        throw new ResponseError(404, "Cannot update data");
    };

    return prismaClient.mahasiswa.update({
        where: {
            id: updateValidate.id
        },
        data: {
            nim: updateValidate.nim,
            password: await bcrypt.hash(updateValidate.password, 10),
            nama: updateValidate.nama,
            prodi: updateValidate.prodi,
            angkatan: updateValidate.angkatan,
            email: updateValidate.email,
        },
        select: {
            id: true,
            nim: true,
            nama: true,
            prodi: true,
            angkatan: true,
            email: true
        }
    })
}

const remove = async (mahasiswaId) => {
    const removeValidate = validate(removeMahasiswaValidation, mahasiswaId);
    const mahasiswa = await prismaClient.mahasiswa.findUnique({
        where: {
            id: removeValidate.id
        }
    })
    if (!mahasiswa) {
        throw new ResponseError(404, "Mahasiswa not found");
    }

    return prismaClient.mahasiswa.delete({
        where: {
            id: removeValidate.id
        },
    })
}

const logout = async (request) => {
    const logoutValidate = validate(logoutMahasiswaValidation, request);
    const mahasiswa = await prismaClient.mahasiswa.findUnique({
        where: {
            id: logoutValidate.id
        }
    });
    if (!mahasiswa) {
        throw new ResponseError(404, "Mahasiswa not found");
    }

    return prismaClient.mahasiswa.update({
        where: {
            id: logoutValidate.id
        },
        data: {
            token: null
        },
        select: {
            id: true,
        }
    })
}

export default {
    register,
    login,
    get,
    update,
    remove,
    logout
}