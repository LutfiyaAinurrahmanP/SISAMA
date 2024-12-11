import { prismaClient } from "../src/application/database";

const removeJadwal = async () => {
    await prismaClient.jadwalKuliah.deleteMany({
        where: {
            hari: "Senin"
        }
    });
};

export {
    removeJadwal
}