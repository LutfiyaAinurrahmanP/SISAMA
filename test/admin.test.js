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
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.password).not.toBe("test");
    });

    test('should cant register admin api', async () => {
        const result = await supertest(web)
            .post('/api/admin')
            .send({
                "nama": "test",
                "username": "",
                "password": "test"
            });
        expect(result.status).toBe(400);
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
                username: "test",
                password: "testpass",
            });
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined;
        expect(result.body.data.token).not.toBe("test");
    });
    test('should reject username', async () => {
        const result = await supertest(web)
            .post('/api/admin/login')
            .send({
                username: "usernamesalah",
                password: "testpass",
            });
        expect(result.status).toBe(401);
    });
    test('should reject password', async () => {
        const result = await supertest(web)
            .post('/api/admin/login')
            .send({
                username: "test",
                password: "passwordsalah",
            });
        expect(result.status).toBe(401);
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
            logger.info(result);
        expect(result.status).toBe(200);
    });
    test('should cant get admin data', async () => {
        const result = await supertest(web)
            .get('/api/admin/current')
            .set('adminAuth', 'tokensalah');
        expect(result.status).toBe(401);
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

describe('DELETE /api/delete/:adminId', () => {
    beforeEach(async () => {
        await createAdmin();
    })
    afterEach(async () => {
        await removeAdmin();
    });
    test('should can remove admin data', async () => {
        const adminId = await getAdminId();
        const result = await supertest(web)
            .delete(`/api/admin/${adminId}`)
            .set(`adminAuth`, `test`);
        logger.info(result);
        expect(result.status).toBe(200);
    });
    test('should cant remove admin data', async () => {
        const adminId = await getAdminId();
        const result = await supertest(web)
            .delete(`/api/admin/${adminId}`)
            .set(`adminAuth`, `tokensalah`);
        logger.info(result);
        expect(result.status).toBe(401);
    });
});

describe('DELETE /api/admin/logout/:adminId', () => {
    beforeEach(async () => {
        await createAdmin();
    })
    afterEach(async () => {
        await removeAdmin();
    });
    test('should can logout current admin', async () => {
        const adminId = await getAdminId();
        const result = await supertest(web)
            .delete(`/api/admin/logout/${adminId}`)
            .set(`adminAuth`, `test`);
            expect(result.status).toBe(200);
    });
    test('should cant logout current admin', async () => {
        const adminId = await getAdminId();
        const result = await supertest(web)
            .delete(`/api/admin/logout/${adminId}`)
            .set(`adminAuth`, `tokensalah`);
            expect(result.status).toBe(401);
    });
});