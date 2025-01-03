import mahasiswaService from "../service/mahasiswa-service.js";

const register = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await mahasiswaService.register(request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await mahasiswaService.login(request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const request = req.mahasiswa.id;
        const result = await mahasiswaService.get(request);
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
        request.id = mahasiswaId;
        await mahasiswaService.remove(request);
        res.status(200).json({
            data: "Successfull deleted data"
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