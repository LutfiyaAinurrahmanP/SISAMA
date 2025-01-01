import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getAdminValidation, loginAdminValidation, logoutAdminValidation, registerAdminValidation, removeAdminValidation, updateAdminValidation } from "../validation/admin-validation.js";
import { validate } from "../validation/validation.js"
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const registerValidate = validate(registerAdminValidation, request);

    const admin = await prismaClient.admin.count({
        where: {
            id: registerValidate.id
        }
    });

    if (admin === 1) {
        throw new ResponseError(401, "Username already registered")
    };

    registerValidate.password = await bcrypt.hash(registerValidate.password, 10);

    return prismaClient.admin.create({
        data: registerValidate,
        select: {
            username: true,
            nama: true
        }
    });
};

const login = async (request) => {
    const loginValidate = validate(loginAdminValidation, request);

    const admin = await prismaClient.admin.findUnique({
        where: {
            username: loginValidate.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!admin) {
        throw new ResponseError(401, "Username or Password is wrong");
    };

    const isPasswordValid = await bcrypt.compare(loginValidate.password, admin.password);

    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or Password is wrong");
    }

    const token = uuid().toString();

    await prismaClient.admin.update({
        where: {
            username: loginValidate.username
        },
        data: {
            token: token
        },
        select: {
            username: true
        }
    })
};

const get = async (request) => {
    const getValidate = validate(getAdminValidation, request)
    const admin = await prismaClient.admin.findUnique({
        where: {
            id: getValidate
        },
        select: {
            id: true,
            nama: true,
            username: true
        }
    });

    if (!admin) {
        throw new ResponseError(404, "Admin data is not found");
    };

    return admin;
}

const update = async (request) => {
    const updateValidate = await validate(updateAdminValidation, request);

    const admin = await prismaClient.admin.findUnique({
        where: {
            id: updateValidate.id
        }
    });

    if (!admin) {
        throw new ResponseError(404, "Admin data is not found");
    };

    return prismaClient.admin.update({
        where: {
            id: updateValidate.id
        },
        data: {
            username: updateValidate.username,
            password: await bcrypt.hash(updateValidate.password, 10),
            nama: updateValidate.nama
        },
        select: {
            id: true,
            username: true,
            nama: true
        }
    })
};

const remove = async (request) => {
    const removeValidate = await validate(removeAdminValidation, request);
    const admin = await prismaClient.admin.findUnique({
        where: {
            id: removeValidate.id
        }
    });
    if (!admin) {
        throw new ResponseError(404, "Admin data is not found");
    };
    return prismaClient.admin.delete({
        where: {
            id: removeValidate.id
        }
    });
};

const logout = async (request) => {
    const logoutValidate = await validate(logoutAdminValidation, request);
    const admin = await prismaClient.admin.findUnique({
        where: {
            id: logoutValidate.id
        }
    });

    if (!admin) {
        throw new ResponseError(404, "Admin data is not founf");
    };

    return prismaClient.admin.update({
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
};

export default {
    register,
    login,
    get,
    update,
    remove,
    logout
};