import jadkulService from "../service/jadkul-service";

const register = async (req, res, next) => {
    try {
        const result = await jadkulService.register(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default {
    register,
};
