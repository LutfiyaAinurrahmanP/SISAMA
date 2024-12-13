import { prismaClient } from "../src/application/database.js"
import bcrypt from 'bcrypt';

const removeAdmin = async () => {
    await prismaClient.admin.deleteMany({
        where: {
            username: "test"
        }
    });
};

const createAdmin = async () => {
    await prismaClient.admin.create({
        data: {
            nama: "test",
            username: "test",
            password: await bcrypt.hash("testpass", 10),
            token: "test"
        }
    });
}

const getAdminId = async () => {
    const admin = await prismaClient.admin.findFirst({
        select: {
            id: true
        }
    });
    return admin?.id;
}

export {
    removeAdmin,
    createAdmin,
    getAdminId
}