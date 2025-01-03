import matkulService from "../service/matkul-service";

const register = async (req, res, next)=>{
    try {
        const request = req.body;
        const result = await matkulService.register(request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next)=>{
    try {
        const matkulId = req.params.matkulId;
        const request = req.body;
        request.id = matkulId;
        const result = await matkulService.get(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    get
};