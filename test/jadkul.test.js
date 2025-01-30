import supertest from "supertest";
import { web } from "../src/application/web";
import { createDosen, removeDosen } from "./dosen-utils";
import { createAdmin, removeAdmin } from "./admin-utils";
import { createMatkul, removeMatkul } from "./matkul-utils";
import { logger } from "../src/application/logging";
import { createJadkul, createManyJadkul, getJadkulId, removeJadkul } from "./jadkul-utils";

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

describe('GET /api/jadkul/:jadkulId', () => {
    beforeEach(async () => {
        await createAdmin();
        // await createMatkul();
        // await createDosen();
        await createJadkul();
    });

    afterEach(async () => {
        await removeJadkul();
        await removeAdmin();
        await removeMatkul();
        await removeDosen();
    });
    test('should can get jadwal kuliah data', async () => {
        const jadkulId = await getJadkulId();
        const result = await supertest(web)
            .get(`/api/jadkul/${jadkulId}`)
            .set('jadkulAuth', 'test');
        logger.info(result);
        expect(result.status).toBe(200);
    });
});

describe('GET/api/jadkul', () => {
    beforeEach(async () => {
        await createAdmin();
        // await createMatkul();
        // await createDosen();
        await createManyJadkul();
    });

    afterEach(async () => {
        await removeJadkul();
        await removeAdmin();
        await removeMatkul();
        await removeDosen();
    });

    test('should can getMany jadwal kuliah data', async () => {
        const result = await supertest(web)
            .get('/api/jadkul')
            .set('jadkulAuth', 'test');
        logger.info(result);
        expect(result.status).toBe(200);
    });
});