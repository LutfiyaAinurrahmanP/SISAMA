import jadkulService from "../services/jadkul-service.js";

const getDropdownData = async (req, res, next) => {
    try {
        const matkul = await jadkulService.getAllMatkul();
        const dosen = await jadkulService.getAllDosen();
        res.status(200).json({
            matkul,
            dosen,
        });
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const { matkulId, dosenId, ...request } = req.body; // Pastikan client mengirim matkulId dan dosenId
        const result = await jadkulService.register(matkulId, dosenId, request);
        res.status(201).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export default {
    getDropdownData,
    register
};
