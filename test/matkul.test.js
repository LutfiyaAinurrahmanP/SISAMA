import supertest from "supertest";
import { createAdmin, removeAdmin } from "./admin-utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createManyMatkul, createMatkul, getMatkulId, removeManyMatkul, removeMatkul, removeMatkulUpdate } from "./matkul-utils";

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
        expect(result.body.data.kode_mk).toBe("test");
        expect(result.body.data.nama_mk).toBe("test");
        expect(result.body.data.sks).toBe("2");
    });
    test('should cant register matkul data', async () => {
        const result = await supertest(web)
            .post('/api/admin/matkul')
            .set("adminAuth", "test")
            .send({
                kode_mk: "",
                nama_mk: "test",
                sks: "2"
            });
        logger.info(result);
        expect(result.status).toBe(400);
    });
});

describe('GET /api/admin/matkul/:matkulId', () => {
    beforeEach(async () => {
        await createAdmin();
        await createMatkul();
    });
    afterEach(async () => {
        await removeAdmin();
        await removeMatkul();
    });
    test('should can get matkul data with matkulId', async () => {
        const matkulId = await getMatkulId();
        const result = await supertest(web)
            .get(`/api/admin/matkul/${matkulId}`)
            .set("adminAuth", "test");
        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data.kode_mk).toBe("test");
        expect(result.body.data.nama_mk).toBe("test");
        expect(result.body.data.sks).toBe("2");
    });
});

describe('GET /api/admin/matkul', () => {
    beforeEach(async () => {
        await createAdmin();
        await createManyMatkul();
    });
    afterEach(async () => {
        await removeAdmin();
        await removeManyMatkul();
    });
    test('should can getMany matkul data', async () => {
        const result = await supertest(web)
            .get(`/api/admin/matkul`)
            .set(`adminAuth`, `test`);
        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(22);
        expect(result.body.data[10].kode_mk).toBe("MK011");
        expect(result.body.data[10].nama_mk).toBe("Pemrograman Web");
        expect(result.body.data[10].sks).toBe("3");
    });
});

describe('PATCH /api/admin/matkul/:matkulId', () => {
    beforeEach(async () => {
        await createAdmin();
        await createMatkul();
    });
    afterEach(async () => {
        await removeAdmin();
        await removeMatkulUpdate();
    });
    test('should can update matkul data',async () => {
        const matkulId = await getMatkulId();
        const result = await supertest(web)
            .patch(`/api/admin/matkul/${matkulId}`)
            .set("adminAuth", "test")
            .send({
                kode_mk: "update",
                nama_mk: "update",
                sks: "3"
            });
        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data.kode_mk).toBe("update");
        expect(result.body.data.nama_mk).toBe("update");
        expect(result.body.data.sks).toBe("3")
    });
});