import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getDosenValidation, loginDosenValidation, logoutDosenValidation, registerDosenValidation, removeDosenValidation, updateDosenValidation } from "../validation/dosen-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const registerValidate = validate(registerDosenValidation, request);
    const dosen = await prismaClient.dosen.findFirst({
        where: {
            id: registerValidate.id
        }
    });

    if (dosen === 1) {
        throw new ResponseError(401, "Nip already exists");
    }

    registerValidate.password = await bcrypt.hash(registerValidate.password, 10);

    return prismaClient.dosen.create({
        data: registerValidate,
        select: {
            nip: true,
            nama: true,
            email: true,
            jabatan: true,
        }
    })
}

const get = async (request) => {
    const getValidate = validate(getDosenValidation, request);
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            id: getValidate
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
    const loginValidate = validate(loginDosenValidation, request);
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            nip: loginValidate.nip
        },
        select: {
            nip: true,
            password: true
        }
    });

    if (!dosen) {
        throw new ResponseError(401, "NIP or Password is wrong")
    };

    const isPasswordValid = await bcrypt.compare(loginValidate.password, dosen.password);

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
    const updateValidate = validate(updateDosenValidation, request);
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            id: updateValidate.id
        }
    });

    if (!dosen) {
        throw new ResponseError(404, "Dosen is not found")
    }

    return prismaClient.dosen.update({
        where: {
            id: updateValidate.id
        },
        data: {
            nip: updateValidate.nip,
            password: await bcrypt.hash(updateValidate.password, 10),
            nama: updateValidate.nama,
            email: updateValidate.email,
            jabatan: updateValidate.jabatan,
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
    const removeValidate = validate(removeDosenValidation, request);
    const dosen = await prismaClient.dosen.findUnique({
        where: {
            id: removeValidate.id
        }
    });

    if (!dosen) {
        throw new ResponseError(404, "Dosen data is not found");
    };

    return prismaClient.dosen.delete({
        where: {
            id: removeValidate.id
        }
    })
}

const logout = async (request) => {
    const logoutValidate = validate(logoutDosenValidation, request);

    const dosen = await prismaClient.dosen.findUnique({
        where: {
            id: logoutValidate.id
        }
    });

    if (!dosen) {
        throw new ResponseError(404, "Dosen data is not found");
    };

    return prismaClient.dosen.update({
        where: {
            id: logoutValidate.id
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