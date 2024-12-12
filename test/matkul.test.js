import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createAdmin, createManyMatkul, createMatkul, getMatkulId, removeAdmin, removeMatkul } from "./matkul-utils";

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
                sks: "1"
            })
        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data.kode_mk).toBe("satu");
        expect(result.body.data.nama_mk).toBe("satu");
        expect(result.body.data.sks).toBe("1");
    });
});

describe('GET /api/admin/matkul/:matkulId', () => {
    beforeEach(async () => {
        await createAdmin();
        await createMatkul();
        
    })
    afterEach(async () => {
        await removeAdmin();
        await removeMatkul();
    });
    test('should can get data', async () => {
        const matkulId = await getMatkulId();
        const result = await supertest(web)
            .get(`/api/admin/matkul/${matkulId}`)
            .set("adminAuth", "testmk");
        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data.kode_mk).toBe("satu");
        expect(result.body.data.nama_mk).toBe("satu");
        expect(result.body.data.sks).toBe("1");
    });
});

describe('GET /api/admin/matkul', () => {
    beforeEach(async () => {
        await createAdmin();
        await createManyMatkul();
        
    })
    afterEach(async () => {
        await removeAdmin();
        await removeMatkul();
    });
    test('should can get many data', async () => {
        const result = await supertest(web)
            .get(`/api/admin/matkul`)
            .set("adminAuth", "testmk");
        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data[0].kode_mk).toBe("satu");
        expect(result.body.data[0].nama_mk).toBe("satu");
        expect(result.body.data[0].sks).toBe("1");
    });
});

describe('PATCH /api/admin/matkul/:matkulId', () => {
    beforeEach(async () => {
        await createAdmin();
        await createMatkul();
    })
    afterEach(async () => {
        await removeAdmin();
        await removeMatkul();
    });
    test('should can update data', async () => {
        const matkulId = await getMatkulId();
        const result = await supertest(web)
            .patch(`/api/admin/matkul/${matkulId}`)
            .set("adminAuth", "testmk")
            .send({
                kode_mk: "dua",
                nama_mk: "dua",
                sks: "2"
            });
        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data.kode_mk).toBe("dua");
        expect(result.body.data.nama_mk).toBe("dua");
        expect(result.body.data.sks).toBe("2");
    });
});


describe('DELETE /api/admin/matkul/:matkulId', () => {
    beforeEach(async () => {
        await createAdmin();
        await createMatkul();
    })
    afterEach(async () => {
        await removeAdmin();
        await removeMatkul();
    });
    test('should can delete data', async () => {
        const matkulId = await getMatkulId();
        const result = await supertest(web)
            .delete(`/api/admin/matkul/${matkulId}`)
            .set("adminAuth", "testmk");
        logger.info(result);
        expect(result.status).toBe(200);
    });
});

