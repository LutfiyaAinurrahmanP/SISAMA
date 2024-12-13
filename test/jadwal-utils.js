import { prismaClient } from "../src/application/database";

const removeJadwal = async () => {
    await prismaClient.jadwalKuliah.deleteMany({});
};

export {
    removeJadwal
}