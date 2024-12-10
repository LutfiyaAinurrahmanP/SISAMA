import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createAdmin, removeAdmin, removeMatkul } from "./matkul-utils";

describe('POST /api/admin/matkul', () => {
    beforeEach(async () => {
        await createAdmin();
    })
    afterEach(async () => {
        await removeAdmin();
        await removeMatkul();
    });
    test('should can create mata kuliah', async () => {
        const result = await supertest(web)
            .post("/api/admin/matkul")
            .set("adminAuth", "testmk")
            .send({
                kode_mk: "satu",
                nama_mk: "satu",
                sks: 1
            })
        logger.info(result);
        expect(result.status).toBe(200);
    });
});