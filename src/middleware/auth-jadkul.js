import { prismaClient } from "../application/database";

export const authJadkul = async (req, res, next) => {
    const token = req.get("jadkulAuth");
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized token"
        });
    };

    const admin = await prismaClient.admin.findFirst({
        where: {
            token: token
        }
    });
    if (!admin) {
        res.status(401).json({
            errors: "Unauthorized admin"
        });
    };

    const matkul = await prismaClient.mataKuliah.findFirst({})
    const dosen = await prismaClient.dosen.findFirst({})
    if (!matkul || !dosen) {
        res.status(401).json({
            errors: "Mata Kuliah or Dosen not found!"
        });
    };

    req.admin = admin;
    req.matkul = matkul;
    req.dosen = dosen;
    next();
};