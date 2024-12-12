import supertest from "supertest";
import { createAdmin, removeAdmin } from "./admin-utils";
import { createDosen, getdosenId, removeDosen } from "./dosen-utils";
import { removeJadwal } from "./jadwal-utils";
import { createMatkul, getMatkulId, removeMatkul } from "./matkul-utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/admin/jadwal", () => {
    beforeEach(async () => {
        await createAdmin();
        await createMatkul();
        await createDosen();
    });

    afterEach(async () => {
        await removeAdmin();
        await removeMatkul();
        await removeDosen();
        await removeJadwal();
    });

    test("should can create jadwal kuliah", async () => {
        const matkulId = await getMatkulId();
        const dosenId = await getdosenId();

        const result = await supertest(web)
            .post("/api/admin/jadkul")
            .set("adminAuth", "test")
            .send({
                mata_kuliah_id: matkulId,
                dosen_id: dosenId,
                hari: "Senin",
                jam_mulai: "08:00",
                jam_selesai: "10:00",
                ruangan: "A101"
            });

        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data.hari).toBe("Senin");
        expect(result.body.data.jam_mulai).toBe("08:00");
        expect(result.body.data.jam_selesai).toBe("10:00");
        expect(result.body.data.ruangan).toBe("A101");
    });
});