import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createMahasiswa, getMahasiswaId, removeMahasiswa } from "./mahasiswa-utils.js";

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
    test('should reject create 400', async () => {
        const result = await supertest(web)
            .post('/api/mahasiswa')
            .send({
                nim: "",
                password: "",
                nama: "",
                prodi: "",
                angkatan: "",
                email: ""
            });
        expect(result.status).toBe(400);
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
        expect(result.status).toBe(200);
    });
    test('should reject nim', async () => {
        const result = await supertest(web)
            .post('/api/mahasiswa/login')
            .send({
                nim: "",
                password: "test"
            });
        expect(result.status).toBe(400);
    });
    test('should reject password', async () => {
        const result = await supertest(web)
            .post('/api/mahasiswa/login')
            .send({
                nim: "test",
                password: ""
            });
        expect(result.status).toBe(400);
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
            .set("mahasiswaAuth", "test");
        expect(result.status).toBe(200);
        expect(result.body.data.nim).toBe("test");
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.prodi).toBe("test");
        expect(result.body.data.angkatan).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
    });
});

describe('PATCH /api/mahasiswa/:mahasiswaId', () => {
    beforeEach(async () => {
        await createMahasiswa();
    });
    afterEach(async () => {
        await removeMahasiswa();
    });
    test('should can update data with mahasiswa nim', async () => {
        const mahasiswaId = await getMahasiswaId();
        const result = await supertest(web)
            .patch(`/api/mahasiswa/${mahasiswaId}`)
            .set("mahasiswaAuth", "test")
            .send({
                nim: "update",
                nama: "test",
                password: "update",
                prodi: "update",
                angkatan: "update",
                email: "update@gmail.com",
            });
        logger.info(result);
        expect(result.status).toBe(200);
        expect(result.body.data.nim).toBe("update");
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.prodi).toBe("update");
        expect(result.body.data.angkatan).toBe("update");
        expect(result.body.data.email).toBe("update@gmail.com");
    });
});

describe('DELETE /api/mahasiswa/:mahasiswaId', () => {
    beforeEach(async () => {
        await createMahasiswa();
    });
    afterEach(async () => {
        await removeMahasiswa();
    });
    test('should can remove mahasiswa data', async () => {
        const mahasiswaId = await getMahasiswaId();
        const result = await supertest(web)
            .delete(`/api/mahasiswa/${mahasiswaId}`)
            .set("mahasiswaAuth", "test");
        expect(result.status).toBe(200);
    });
    test('should can remove mahasiswa data', async () => {
        const mahasiswaId = await getMahasiswaId();
        const result = await supertest(web)
            .delete(`/api/mahasiswa/${mahasiswaId + 1}`)
            .set("mahasiswaAuth", "test");
        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/mahasiswa/logout/:mahasiswaId', () => {
    beforeEach(async () => {
        await createMahasiswa();
    });
    afterEach(async () => {
        await removeMahasiswa();
    });
    test('should can logout', async () => {
        const mahasiswaId = await getMahasiswaId();
        const result = await supertest(web)
            .delete(`/api/mahasiswa/logout/${mahasiswaId}`)
            .set("mahasiswaAuth", "test");
        expect(result.status).toBe(200);
    });
    test('should t logout', async () => {
        const mahasiswaId = await getMahasiswaId();
        const result = await supertest(web)
            .delete(`/api/mahasiswa/logout/${mahasiswaId + 1}`)
            .set("mahasiswaAuth", "test");
        expect(result.status).toBe(404);
    });
});