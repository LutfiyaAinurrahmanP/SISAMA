import dosenService from "../service/dosen-service.js"

const register = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await dosenService.register(request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const nip = req.dosen.nip;
        const result = await dosenService.get(nip);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    };
};

const login = async (req, res, next) => {
    try {
        const result = await dosenService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const dosenId = req.params.dosenId;
        const request = req.body;
        request.id = dosenId;
        const result = await dosenService.update(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const dosenId = req.params.dosenId;
        const request = req.body;
        request.id = dosenId;
        await dosenService.remove(request);
        res.status(200).json({
            data: "Successful deleted data"
        })
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    get,
    login,
    update,
    remove
}