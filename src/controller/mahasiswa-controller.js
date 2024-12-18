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

const update = async (req, res, next) => {
    try {
        const mahasiswaId = req.params.mahasiswaId;
        const request = req.body;
        request.id = mahasiswaId;
        const result = await mahasiswaService.update(request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const mahasiswaId = req.params.mahasiswaId;
        const request = req.body;
        request.id = mahasiswaId
        await mahasiswaService.remove(request);
        res.status(200).json({
            data: "Successdull deleted data"
        })
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const mahasiswaId = req.params.mahasiswaId;
        const request = req.body;
        request.id = mahasiswaId;
        await mahasiswaService.logout(request);
        res.status(200).json({
            data: "Successful Logout"
        })
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    get,
    update,
    remove,
    logout
}