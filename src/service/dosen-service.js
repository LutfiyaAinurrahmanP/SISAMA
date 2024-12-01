import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getDosenValidation, registerDosenValidation } from "../validation/dosen-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from 'bcrypt';

const register = async (request) => {
    const dosen = validate(registerDosenValidation, request);
    const countDosen = await prismaClient.dosen.count({
        where: {
            id: dosen.id
        }
    });

    if (countDosen === 1) {
        throw new ResponseError(401, "Nip already exists");
    }

    dosen.password = await bcrypt.hash(dosen.password, 10);

    return prismaClient.dosen.create({
        data: dosen,
        select: {
            nip: true,
            nama: true,
            email: true,
            jabatan: true,
        }
    })
}

const get = async (nip) => {
    nip = validate(getDosenValidation, nip);

    const dosen = await prismaClient.dosen.findUnique({
        where: {
            nip: nip
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
        throw new ResponseError(404, "Dosen data is not found");
    };
    return dosen;
};

export default {
    register,
    get
}