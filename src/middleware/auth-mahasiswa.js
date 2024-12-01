import { prismaClient } from "../application/database";

export const authMahasiswa = async (req, res, next) => {
    const token = req.get("mahasiswaAuth");
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        });
    } else {
        const mahasiswa = await prismaClient.mahasiswa.findFirst({
            where: {
                token: token
            }
        });
        if (!mahasiswa) {
            res.status(401).json({
                errors: "Unauthorized"
            });
        } else {
            req.mahasiswa = mahasiswa;
            next();
        }
    }
}