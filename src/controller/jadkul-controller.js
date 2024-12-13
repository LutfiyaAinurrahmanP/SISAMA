import jadkulService from "../service/jadkul-service";
import { logger } from "../application/logging";

const register = async (req, res, next) => {
    try {
        const dosen = req.dosen;
        const mataKuliah = req.mataKuliah;
        const request = req.body;
        const result = await jadkulService.register(dosen, mataKuliah, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        logger.error("Error in register:", e.message);
        next(e);
    }
};


export default {
    register
}
