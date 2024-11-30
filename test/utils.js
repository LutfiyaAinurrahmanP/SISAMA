import { prismaClient } from "../src/application/database.js"
import bcrypt from 'bcrypt';

const removeMahasiswa = async () => {
    await prismaClient.mahasiswa.deleteMany({
        where: {
            nama: "test"
        }
    });
}

const createMahasiswa = async () => {
    await prismaClient.mahasiswa.create({
        data: {
            nim: "test",
            password: await bcrypt.hash("test", 10),
            nama: "test",
            prodi: "test",
            angkatan: "test",
            email: "test@gmail.com",
            token: "test"
        }
    })
}

export {
    removeMahasiswa,
    createMahasiswa,
}