import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getDosenValidation, loginDosenValidation, logoutDosenValidation, registerDosenValidation, removeDosenValidation, updateDosenValidation } from "../validation/dosen-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const dosen = validate(registerDosenValidation, request);
    const countDosen = await prismaClient.dosen.findFirst({
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

const get = async (request) => {
    const requestGet = validate(getDosenValidation, request);
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            id: requestGet.id
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

const login = async (request) => {
    const loginRequest = validate(loginDosenValidation, request);
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            nip: loginRequest.nip
        },
        select: {
            nip: true,
            password: true
        }
    });

    if (!dosen) {
        throw new ResponseError(401, "NIP or Password is wrong")
    };

    const isPasswordValid = await bcrypt.compare(loginRequest.password, dosen.password);

    if (!isPasswordValid) {
        throw new ResponseError(401, "NIP or Password is wrong");
    }

    const token = uuid().toString();
    return prismaClient.dosen.update({
        data: {
            token: token
        },
        where: {
            nip: dosen.nip
        },
        select: {
            token: true
        }
    });
};

const update = async (request) => {
    const updateRequest = validate(updateDosenValidation, request);
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            id: updateRequest.id
        }
    });

    if (!dosen) {
        throw new ResponseError(404, "Dosen is not found")
    }

    return prismaClient.dosen.update({
        where: {
            id: updateRequest.id
        },
        data: {
            nip: updateRequest.nip,
            password: await bcrypt.hash(updateRequest.password, 10),
            nama: updateRequest.nama,
            email: updateRequest.email,
            jabatan: updateRequest.jabatan,
        },
        select: {
            id: true,
            nip: true,
            nama: true,
            email: true,
            jabatan: true,
        }
    })
}

const remove = async (request) => {
    const removeRequest = validate(removeDosenValidation, request);
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            id: removeRequest.id
        }
    });

    if (!dosen) {
        throw new ResponseError(404, "Dosen data is not found");
    };

    return prismaClient.dosen.delete({
        where: {
            id: removeRequest.id
        }
    })
}

const logout = async (request) => {
    const requestLogout = validate(logoutDosenValidation, request);

    const dosen = await prismaClient.dosen.findUnique({
        where: {
            id: requestLogout.id
        }
    });

    if (!dosen) {
        throw new ResponseError(404, "Dosen data is not found");
    };

    return prismaClient.dosen.update({
        where: {
            id: requestLogout.id
        },
        data: {
            token: null
        },
        select: {
            id: true
        }
    })
}

export default {
    register,
    get,
    login,
    update,
    remove,
    logout
}