import jadkulService from "../service/jadkul-service";

const register = async (req, res, next) => {
    try {
        const {dosen, matkul, ...request} = req.body;
        const result = await jadkulService.register(
            { id: dosen },
            { id: matkul },
            request
        );
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register
}