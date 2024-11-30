import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createMahasiswa, removeMahasiswa } from "./utils.js";

describe('POST /api/mahasiswa', () => {
    afterEach(async () => {
        await removeMahasiswa();
    })
    test('should can create mahasiswa data', async () => {
        const result = await supertest(web)
            .post('/api/mahasiswa')
            .send({
                nim: "test",
                password: "test",
                nama: "test",
                prodi: "test",
                angkatan: "test",
                email: "test@gmail.com"
            });
        expect(result.status).toBe(200);
        expect(result.body.data.nim).toBe("test");
        expect(result.body.data.nama).toBeDefined();
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.prodi).toBe("test");
        expect(result.body.data.angkatan).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
    });
});

describe('POST /api/mahasiswa/login', () => {
    beforeEach(async () => {
        await createMahasiswa();
    });
    afterEach(async () => {
        await removeMahasiswa();
    });
    test('can login mahasiswa', async () => {
        const result = await supertest(web)
            .post('/api/mahasiswa/login')
            .send({
                nim: "test",
                password: "test"
            });
        logger.info(result.body.data.token);
        expect(result.status).toBe(200);
        logger.info(result.body.data);
    });
});

describe('GET /api/mahasiswa/current', () => {
    beforeEach(async () => {
        await createMahasiswa();
    });
    afterEach(async () => {
        await removeMahasiswa();
    });
    test('should can get mahasiswa data', async () => {
        const result = await supertest(web)
            .get('/api/mahasiswa/current')
            .set("Authorization", "test");
        expect(result.status).toBe(200);
    });
});