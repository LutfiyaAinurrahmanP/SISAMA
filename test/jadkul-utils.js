import { prismaClient } from "../src/application/database"
import { createMatkul } from "./matkul-utils";
import { createDosen } from "./dosen-utils";
import { ResponseError } from "../src/error/response-error";

const removeJadkul = async () => {
    await prismaClient.jadwalKuliah.deleteMany({})
};

const getJadkulId = async () => {
    const jadkul = await prismaClient.jadwalKuliah.findFirst({
        select: {
            id: true
        }
    });
    return jadkul?.id;
};

const createJadkul = async () => {
    const matkul = await createMatkul();
    const dosen = await createDosen();
    await prismaClient.jadwalKuliah.create({
        data: {
            mata_kuliah_id: matkul.id,
            dosen_id: dosen.id,
            hari: "Senin",
            jam_mulai: "08:00",
            jam_selesai: "10:00",
            ruangan: "R101"
        }
    });
};

const createManyJadkul = async (jadwalList) => {
    if(!Array.isArray(jadwalList) || jadwalList.length === 0){
        throw new ResponseError(400, "Invalid jadwal data");
    };

    const matkul = await createMatkul();
    const dosen = await createDosen();

    if(!matkul || !matkul.id){
        throw new ResponseError(400, "Invalid matkul data");
    };

    if(!dosen || !dosen.id){
        throw new ResponseError(400, "Invalid dosen data");
    };

    await prismaClient.jadwalKuliah.createMany({
        data: jadwalList.map(jadwal => ({
            mata_kuliah_id: matkul.id,
            dosen_id: dosen.id,
            hari: jadwal.hari,
            jam_mulai: jadwal.jam_mulai,
            jam_selesai: jadwal.jam_selesai,
            ruangan: jadwal.ruangan
        }))
    });
};

export {
    removeJadkul,
    getJadkulId,
    createJadkul,
    createManyJadkul
}
