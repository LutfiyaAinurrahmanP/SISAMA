import adminService from "../service/admin-service.js"

const register = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await adminService.register(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await adminService.login(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await adminService.get(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    };
};

export default {
    register,
    login
}