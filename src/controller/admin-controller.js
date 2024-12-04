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
        const request = req.admin.username;
        const result = await adminService.get(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    };
};

const update = async (req, res, next) => {
    try {
        const adminId = req.params.adminId;
        const request = req.body;
        request.id = adminId;
        const result = await adminService.update(request);
        res.status(200).json({
            data: result
        });
    }
    catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    get,
    update
}