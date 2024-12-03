import supertest from "supertest";
import { createAdmin, removeAdmin } from "./admin-utils";
import { web } from "../src/application/web.js";

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
