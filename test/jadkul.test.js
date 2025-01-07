import supertest from "supertest";
import { web } from "../src/application/web";
import { createDosen, removeDosen } from "./dosen-utils";
import { createAdmin, removeAdmin } from "./admin-utils";
import { createMatkul, removeMatkul } from "./matkul-utils";
import { logger } from "../src/application/logging";

describe("POST /api/admin/jadkul", () => {
    beforeEach(async () => {
        await createAdmin();
        await createMatkul();
        await createDosen();
    });

    afterEach(async () => {
        await removeAdmin();
        await removeMatkul();
        await removeDosen();
    });

    test("should register jadwal kuliah data", async () => {
        const result = await supertest(web)
            .post("/api/admin/jadkul")
            .set("adminAuth", "test")
            .send({
                // nama_mk: "Matematika Diskrit",
                // nama: "Dr. John Doe",
                hari: "Senin",
                jam_mulai: "08:00",
                jam_selesai: "10:00",
                ruangan: "R101",
            });

        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });
});
