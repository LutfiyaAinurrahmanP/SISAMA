import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe('POST /api/mahasiswa', () => {
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
    });
});