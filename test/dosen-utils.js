import { prismaClient } from "../src/application/database.js"
import bcrypt from 'bcrypt';

const createDosen = async () => {
    await prismaClient.dosen.create({
        data: {
            nip: "123",
            password: await bcrypt.hash("testpass", 10),
            nama: "test",
            email: "test@gmail.com",
            jabatan: "test",
            token: "test"
        }
    });
};

const removeDosen = async () => {
    await prismaClient.dosen.deleteMany({
        where: {
            nama: "test"
        }
    })
};

export {
    removeDosen,
    createDosen,
}