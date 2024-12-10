import { prismaClient } from "../src/application/database.js"
import bcrypt from 'bcrypt';

const removeAdmin = async () => {
    await prismaClient.admin.deleteMany({
        where: {
            username: "testmk"
        }
    });
};

const removeMatkul = async ()=>{
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

export {
    removeAdmin,
    removeMatkul,
    createAdmin
}