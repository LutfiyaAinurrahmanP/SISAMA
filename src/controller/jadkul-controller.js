import { logger } from "../application/logging";
import jadkulService from "../service/jadkul-service";

const register = async (req, res, next) => {
    try {
        const matkul = req.matkul;
        const dosen = req.dosen;
        const request = req.body;
        const result = await jadkulService.register(matkul, dosen, request);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        logger.error(e);
        next(e);
    }
};

export default {
    register,
};
