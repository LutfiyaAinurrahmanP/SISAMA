import Joi from "joi";

const registerJadkulValidation = Joi.object({
    hari: Joi.string().max(64).required(),
    jam_mulai: Joi.string().max(64).required(),
    jam_selesai: Joi.string().max(64).required(),
    ruangan: Joi.string().max(64).required(),
});

const getJadkulValidation = Joi.object({
    id: Joi.number().positive().required()
});


export {
    registerJadkulValidation,
    getJadkulValidation
}