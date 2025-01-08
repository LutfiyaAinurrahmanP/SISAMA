import { prismaClient } from "../src/application/database"

const removeJadkul = async ()=>{
    await prismaClient.jadwalKuliah.deleteMany({})
};

export {
    removeJadkul
}