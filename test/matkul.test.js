import supertest from "supertest";
import { createAdmin, removeAdmin } from "./admin-utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { removeMatkul } from "./matkul-utils";

describe('POST /api/admin/matkul', () => {
    beforeEach(async () => {
        await createAdmin();
    });
    afterEach(async () => {
        await removeAdmin();
        await removeMatkul();
    });
    test('should can register matkul data', async () => {
        const result = await supertest(web)
            .post('/api/admin/matkul')
            .set("adminAuth", "test")
            .send({
                kode_mk: "test",
                nama_mk: "test",
                sks: "2"
            });
            logger.info(result);
            expect(result.status).toBe(200);
    });
});