import { prismaClient } from "../src/application/database.js"
import bcrypt from 'bcrypt';

const createDosen = async () => {
    const dosen = await prismaClient.dosen.create({
        data: {
            nip: "123",
            password: await bcrypt.hash("testpass", 10),
            nama: "test",
            email: "test@gmail.com",
            jabatan: "test",
            token: "test"
        },
        select: {
            id: true
        }
    });
    return dosen;
};

const removeDosen = async () => {
    await prismaClient.dosen.deleteMany({
        where: {
            nip: "123"
        }
    })
};

const getdosenId = async () => {
    const dosen = await prismaClient.dosen.findFirst({
        select: {
            id: true
        }
    });
    return dosen?.id;
}

export {
    removeDosen,
    createDosen,
    getdosenId
}
