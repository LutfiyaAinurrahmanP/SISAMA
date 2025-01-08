import supertest from "supertest";
import { web } from "../src/application/web";
import { createDosen, removeDosen } from "./dosen-utils";
import { createAdmin, removeAdmin } from "./admin-utils";
import { createMatkul, removeMatkul } from "./matkul-utils";
import { logger } from "../src/application/logging";
import { removeJadkul } from "./jadkul-utils";

describe("POST /api/admin/jadkul", () => {
    beforeEach(async () => {
        await createAdmin();
        await createMatkul();
        await createDosen();
    });

    afterEach(async () => {
        await removeJadkul();
        await removeAdmin();
        await removeMatkul();
        await removeDosen();
    });

    test("should register jadwal kuliah data", async () => {
        const result = await supertest(web)
            .post("/api/jadkul")
            .set("jadkulAuth", "test")
            .send({
                hari: "Senin",
                jam_mulai: "08:00",
                jam_selesai: "10:00",
                ruangan: "R101",
            });
    
        logger.info(result);
        expect(result.status).toBe(200);
    });
    
});
