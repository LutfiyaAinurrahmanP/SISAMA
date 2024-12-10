import Joi from "joi";

const registerMataKuliahValidation = Joi.object({
    kode_mk: Joi.string().max(64).required(),
    nama_mk: Joi.string().max(64).required(),
    sks: Joi.number().positive().required()
});

export {
    registerMataKuliahValidation
}