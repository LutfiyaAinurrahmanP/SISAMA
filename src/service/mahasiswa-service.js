import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js"
import { getMahasiswaValidation, loginMahasiswaValidation, logoutMahasiswaValidation, registerMahasiswaValidation, removeMahasiswaValidation, updateMahasiswaValidation } from "../validation/mahasiswa-validation.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const mahasiswa = validate(registerMahasiswaValidation, request);

    const countMahasiswa = await prismaClient.mahasiswa.count({
        where: {
            id: mahasiswa.id
        }
    });
    if (countMahasiswa === 1) {
        throw new ResponseError(400, "nim already exists");
    }

    mahasiswa.password = await bcrypt.hash(mahasiswa.password, 10);

    return prismaClient.mahasiswa.create({
        data: mahasiswa,
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
    const loginRequest = validate(loginMahasiswaValidation, request);
    const mahasiswa = await prismaClient.mahasiswa.findUnique({
        where: {
            nim: loginRequest.nim
        },
        select: {
            nim: true,
            password: true
        }
    });
    if (!mahasiswa) {
        throw new ResponseError(401, "NIM or Password is wrong");
    }
    const isPasswordValid = await bcrypt.compare(loginRequest.password, mahasiswa.password);
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

const get = async (nim) => {
    nim = validate(getMahasiswaValidation, nim);
    const mahasiswa = await prismaClient.mahasiswa.findUnique({
        where: {
            nim: nim
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
    const mahasiswa = await validate(updateMahasiswaValidation, request);
    const totalMahasiswaInDatabase = await prismaClient.mahasiswa.findUnique({
        id: mahasiswa.id
    });
    if (!totalMahasiswaInDatabase) {
        throw new ResponseError(404, "Cannot update data");
    };

    return prismaClient.mahasiswa.update({
        where: {
            id: mahasiswa.id
        },
        data: {
            nim: mahasiswa.nim,
            password: await bcrypt.hash(mahasiswa.password, 10),
            nama: mahasiswa.nama,
            prodi: mahasiswa.prodi,
            angkatan: mahasiswa.angkatan,
            email: mahasiswa.email,
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
    const mahasiswa = validate(removeMahasiswaValidation, mahasiswaId);
    const totalMahasiswaInDatabase = await prismaClient.mahasiswa.findUnique({
        where: {
            id: mahasiswa.id
        }
    })
    if (!totalMahasiswaInDatabase) {
        throw new ResponseError(404, "Mahasiswa not found");
    }

    return prismaClient.mahasiswa.delete({
        where: {
            id: mahasiswa.id
        },
    })
}

const logout = async (request) => {
    const mahasiswa = validate(logoutMahasiswaValidation, request);
    const totalMahasiswaInDatabase = await prismaClient.mahasiswa.findUnique({
        where: {
            id: mahasiswa.id
        }
    });
    if (!totalMahasiswaInDatabase) {
        throw new ResponseError(404, "Mahasiswa not found");
    }

    return prismaClient.mahasiswa.update({
        where: {
            id: mahasiswa.id
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