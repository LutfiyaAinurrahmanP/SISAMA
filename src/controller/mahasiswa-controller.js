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

const login = async (req, res, next) => {
    try {
        const result = await mahasiswaService.login(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const nim = req.mahasiswa.nim;
        const result = await mahasiswaService.get(nim);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    get
}