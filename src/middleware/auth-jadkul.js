// import { prismaClient } from "../application/database";

// export const jadkulAuth = async (req, res, next) => {
//     const token = req.get("adminAuth");

//     if (!token) {
//         return res.status(401).json({ errors: "Unauthorized" });
//     }

//     try {
//         // Validasi admin berdasarkan token
//         const admin = await prismaClient.admin.findFirst({
//             where: { token: token },
//         });

//         if (!admin) {
//             return res.status(401).json({ errors: "Unauthorized" });
//         }

//         // Validasi dosen (dapatkan dosen pertama untuk contoh)
//         const dosen = await prismaClient.dosen.findFirst();
//         if (!dosen) {
//             return res.status(400).json({ errors: "Dosen not found" });
//         }

//         // Validasi mata kuliah (dapatkan mata kuliah pertama untuk contoh)
//         const mataKuliah = await prismaClient.mataKuliah.findFirst();
//         if (!mataKuliah) {
//             return res.status(400).json({ errors: "Mata Kuliah not found" });
//         }

//         // Tambahkan data ke request untuk digunakan di handler berikutnya
//         req.admin = admin;
//         req.dosen = dosen;
//         req.mataKuliah = mataKuliah;

//         // Lanjutkan ke middleware atau route berikutnya
//         next();
//     } catch (error) {
//         return res.status(500).json({ errors: "Internal server error", details: error.message });
//     }
// };
