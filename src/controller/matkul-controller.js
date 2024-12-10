import matkulService from "../service/matkul-service";

const register = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await matkulService.register(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

export default {
    register
}