import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js"
import { registerMahasiswaValidation } from "../validation/mahasiswa-validation.js"
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

export default {
    register
}