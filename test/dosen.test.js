import supertest from 'supertest';
import { web } from '../src/application/web.js';
import { createDosen, getdosenId, removeDosen } from './dosen-utils.js';
import { logger } from '../src/application/logging.js';

describe('POST /api/dosen', () => {
    afterEach(async () => {
        await removeDosen();
    })
    test('should can register dosen data', async () => {
        const result = await supertest(web)
            .post('/api/dosen')
            .send({
                "nip": "123",
                "password": "test",
                "nama": "test",
                "email": "test@gmail.com",
                "jabatan": "test",
            });
        expect(result.status).toBe(200);
        expect(result.body.data.nip).toBe("123");
        expect(result.body.data.nip).toBeDefined();
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.jabatan).toBe("test");
    });
    test('should cant register dosen data', async () => {
        const result = await supertest(web)
            .post('/api/dosen')
            .send({
                "nip": "123",
                "password": "rahasia",
                "nama": "test",
                "email": "",
                "jabatan": ""
            });
        expect(result.status).toBe(400);
    });
});

describe('GET /api/dosen/current', () => {
    beforeEach(async () => {
        await createDosen();
    });
    afterEach(async () => {
        await removeDosen();
    });
    test('should can get dosen', async () => {

        const result = await supertest(web)
            .get('/api/dosen/current')
            .set("dosenAuth", "test");
        logger.info(result);
        console.log(result);
        expect(result.status).toBe(200);
        expect(result.body.data.nip).toBe("123");
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.jabatan).toBe("test");
    });
    test('should cant get dosen', async () => {
        const result = await supertest(web)
            .get('/api/dosen/current')
            .set("dosenAuth", "tokenSalah");
        expect(result.status).toBe(401);
    });
});

describe('POST /api/dosen/login', () => {
    beforeEach(async () => {
        await createDosen();
    });
    afterEach(async () => {
        await removeDosen();
    });
    test('should can login', async () => {
        const result = await supertest(web)
            .post('/api/dosen/login')
            .send({
                nip: "123",
                password: "testpass"
            });
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });
    test('should reject nip', async () => {
        const result = await supertest(web)
            .post('/api/dosen/login')
            .send({
                nip: "",
                password: "testpass"
            });
        expect(result.status).toBe(400);
    });
    test('should reject password', async () => {
        const result = await supertest(web)
            .post('/api/dosen/login')
            .send({
                nip: "123",
                password: ""
            });
        expect(result.status).toBe(400);
    });
});

describe('PATCH /api/dosen/:dosenId', () => {
    beforeEach(async () => {
        await createDosen();
    });
    afterEach(async () => {
        await removeDosen();
    });
    test('should cant update dosen data', async () => {
        const dosenId = await getdosenId();
        const result = await supertest(web)
            .patch(`/api/dosen/${dosenId}`)
            .set("dosenAuth", "test")
            .send({
                "nip": "123",
                "password": "update",
                "nama": "test",
                "email": "update@gmail.com",
                "jabatan": "update",
            });
        expect(result.status).toBe(200);
        expect(result.body.data.nip).toBe("123");
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.email).toBe("update@gmail.com");
        expect(result.body.data.jabatan).toBe("update");
    });
});

describe('DELETE /api/dosen/:dosenId', () => {
    beforeEach(async () => {
        await createDosen();
    });
    afterEach(async () => {
        await removeDosen();
    });
    test('should can deleted data', async () => {
        const dosenId = await getdosenId();
        const result = await supertest(web)
            .delete(`/api/dosen/${dosenId}`)
            .set("dosenAuth", "test");
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("Successful deleted data");
    });
    test('should cant deleted data', async () => {
        const dosenId = await getdosenId();
        const result = await supertest(web)
            .delete(`/api/dosen/${dosenId}`)
            .set("dosenAuth", "tokensalah");
        expect(result.status).toBe(401);
    });
});

describe('DELETE /api/dosen/logout/:dosenId', () => {
    beforeEach(async () => {
        await createDosen();
    });
    afterEach(async () => {
        await removeDosen();
    });
    test('should can deleted data', async () => {
        const dosenId = await getdosenId();
        const result = await supertest(web)
            .delete(`/api/dosen/logout/${dosenId}`)
            .set("dosenAuth", "test");
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("Successful logout");
    });
    test('should cant deleted data', async () => {
        const dosenId = await getdosenId();
        const result = await supertest(web)
            .delete(`/api/dosen/logout/${dosenId}`)
            .set("dosenAuth", "tokensalah");
        expect(result.status).toBe(401);
    });
});