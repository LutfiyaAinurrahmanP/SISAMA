import { prismaClient } from "../src/application/database";

const removeMatkul = async () => {
    await prismaClient.mataKuliah.deleteMany({
        where: {
            kode_mk: "test"
        }
    })
};

export {
    removeMatkul
};