import { prismaClient } from "../src/application/database.js"
import bcrypt from 'bcrypt';

const removeAdmin = async () => {
    await prismaClient.admin.deleteMany({
        where: {
            username: "testmk"
        }
    });
};

const removeMatkul = async () => {
    await prismaClient.mataKuliah.deleteMany({
        where: {
            kode_mk: "satu"
        }
    })
}

const createAdmin = async () => {
    await prismaClient.admin.create({
        data: {
            nama: "testmk",
            username: "testmk",
            password: await bcrypt.hash("testmkpass", 10),
            token: "testmk"
        }
    })
}

const createMatkul = async () => {
    await prismaClient.mataKuliah.create({
        data: {
            kode_mk: "satu",
            nama_mk: "satu",
            sks: "1"
        }
    })
}

const getMatkulId = async () => {
    const matkul = await prismaClient.mataKuliah.findFirst({
        select: {
            id: true
        }
    });
    return matkul?.id;
}

export {
    removeAdmin,
    removeMatkul,
    createAdmin,
    createMatkul,
    getMatkulId
}