import { prismaClient } from "../application/database";

export const authAdmin = async (req, res, next) => {
    const token = req.get("adminAuth");
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        });
    } else {
        const admin = await prismaClient.admin.findFirst({
            where: {
                token: token
            }
        });
        if (!admin) {
            res.status(401).json({
                errors: "Unauthorized"
            });
        } else {
            req.admin = admin;
            next();
        }
    }
}