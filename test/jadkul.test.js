import supertest from "supertest";
import { createAdmin, removeAdmin } from "./admin-utils";
import { createDosen, removeDosen } from "./dosen-utils";
import { removeJadwal } from "./jadwal-utils";
import { createMatkul, removeMatkul } from "./matkul-utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/admin/jadwal", () => {
    beforeEach(async () => {
        await createAdmin();
        await createMatkul();
        await createDosen();
    });

    afterEach(async () => {
        // await removeAdmin();
        // await removeJadwal();
        // await removeMatkul();
        // await removeDosen();
    });

    test("should can create jadwal kuliah", async () => {

        const result = await supertest(web)
            .post("/api/admin/jadkul")
            .set("adminAuth", "test")
            .send({
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
