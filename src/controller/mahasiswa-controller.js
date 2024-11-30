import mahasiswaService from "../service/mahasiswa-service.js";

const register = async (req, res, next) => {
    try {
        const result = await mahasiswaService.register(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

export default{
    register
}