import dosenService from "../service/dosen-service.js"

const register = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await dosenService.register(request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next)=>{
    try {
        const nip = req.dosen.nip
        const result = await dosenService.get(nip);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    };
};

export default {
    register,
    get
}