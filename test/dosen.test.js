import supertest from 'supertest';
import { web } from '../src/application/web.js';
import { createDosen, removeDosen } from './dosen-utils.js';
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
        // logger.info(result);
        expect(result.status).toBe(200);
    });
});