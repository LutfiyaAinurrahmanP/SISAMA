import Joi from "joi";

const registerMatkulValidation = Joi.object({
    kode_mk: Joi.string().max(64).required(),
    nama_mk: Joi.string().max(64).required(),
    sks: Joi.string().max(64).required(),
});

const getMatkulValidation = Joi.number().positive().required();

export {
    registerMatkulValidation,
    getMatkulValidation
}