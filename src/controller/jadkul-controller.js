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

const get = async (req, res, next) => {
    try {
        const jadkulId = req.params.jadkulId;
        const request = req.body;
        request.id = jadkulId;
        const result = await jadkulService.get(request);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const getMany = async (req, res, next) => {
    try {
        const result = await jadkulService.getMany();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    get,
    getMany
};
