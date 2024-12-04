import supertest from "supertest";
import { createAdmin, getAdminId, removeAdmin } from "./admin-utils";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe('POST /api/admin', () => {
    afterEach(async () => {
        await removeAdmin()
    });
    test('should can register admin api', async () => {
        const result = await supertest(web)
            .post('/api/admin')
            .send({
                "nama": "test",
                "username": "test",
                "password": "test"
            });
        expect(result.status).toBe(200);
    });
});

describe('POST /api/admin/login', () => {
    beforeEach(async () => {
        await createAdmin();
    })
    afterEach(async () => {
        await removeAdmin();
    });
    test('should can login', async () => {
        const result = await supertest(web)
            .post('/api/admin/login')
            .send({
                "username": "test",
                "password": "testpass",
            })
        expect(result.status).toBe(200);
    });
});

describe('GET /api/admin/current', () => {
    beforeEach(async () => {
        await createAdmin();
    })
    afterEach(async () => {
        await removeAdmin();
    });
    test('should can get admin data', async () => {
        const result = await supertest(web)
            .get('/api/admin/current')
            .set('adminAuth', 'test');
        expect(result.status).toBe(200);
    });
});

describe('PATCH /api/admin/:adminId', () => {
    beforeEach(async () => {
        await createAdmin();
    })
    afterEach(async () => {
        await removeAdmin();
    });
    test('should can update admin data', async () => {
        const adminId = await getAdminId();
        const result = await supertest(web)
            .patch(`/api/admin/${adminId}`)
            .set('adminAuth', 'test')
            .send({
                "nama": "update",
                "username": "test",
                "password": "update"
            });
            logger.info(result);
        expect(result.status).toBe(200);
    });
});