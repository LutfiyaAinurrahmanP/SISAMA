import { prismaClient } from "../application/database";

export const authAdmin = async (req, res, next) => {
    const token = req.get("adminAuth");
    if (!token) {
        return res.status(401).json({ errors: "Unauthorized" });
    }

    const admin = await prismaClient.admin.findFirst({ where: { token } });
    if (!admin) {
        return res.status(401).json({ errors: "Unauthorized" });
    }

    const dosen = await prismaClient.dosen.findFirst();
    const mataKuliah = await prismaClient.mataKuliah.findFirst();

    if (!dosen || !mataKuliah) {
        return res.status(400).json({ errors: "Dosen or Mata Kuliah not found" });
    }

    req.admin = admin;
    req.dosen = dosen;
    req.mataKuliah = mataKuliah;
    next();
};
