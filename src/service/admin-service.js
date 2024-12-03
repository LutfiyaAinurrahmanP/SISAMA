import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getAdminValidation, loginAdminValidation, registerAdminValidation } from "../validation/admin-validation.js";
import { validate } from "../validation/validation.js"
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const requestRegister = validate(registerAdminValidation, request);

    const admin = await prismaClient.admin.count({
        where: {
            id: requestRegister.id
        }
    });

    if (admin === 1) {
        throw new ResponseError(401, "Username already registered")
    };

    requestRegister.password = await bcrypt.hash(requestRegister.password, 10);

    return prismaClient.admin.create({
        data: requestRegister,
        select: {
            username: true,
            nama: true
        }
    });
};

const login = async (request) => {
    const requestLogin = validate(loginAdminValidation, request);

    const admin = await prismaClient.admin.findUnique({
        where: {
            username: requestLogin.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!admin) {
        throw new ResponseError(401, "Username or Password is wrong");
    };

    const isPasswordValid = await bcrypt.compare(requestLogin.password, admin.password);

    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or Password is wrong");
    }

    const token = uuid().toString();

    await prismaClient.admin.update({
        where: {
            username: requestLogin.username
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
    const requestGet = validate(getAdminValidation, request)
    const admin = await prismaClient.admin.findUnique({
        where: {
            id: requestGet.id
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

export default {
    register,
    login,
    get
};