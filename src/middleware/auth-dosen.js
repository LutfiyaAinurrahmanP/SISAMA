import { prismaClient } from "../application/database";

export const authDosen = async (req, res, next) => {
    const token = req.get("dosenAuth");
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        });
    } else {
        const dosen = await prismaClient.dosen.findFirst({
            where: {
                token: token
            }
        });
        if (!dosen) {
            res.status(401).json({
                errors: "Unauthorized"
            });
        } else {
            req.dosen = dosen;
            next();
        }
    }
}