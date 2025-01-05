import Joi from "joi";

const registerMatkulValidation = Joi.object({
    kode_mk: Joi.string().max(64).required(),
    nama_mk: Joi.string().max(64).required(),
    sks: Joi.string().max(64).required(),
});

const getMatkulValidation = Joi.object({
    id: Joi.number().positive().required()
})

const updateMatkulValidation = Joi.object({
    id: Joi.number().positive().required(),
    kode_mk: Joi.string().max(64).required(),
    nama_mk: Joi.string().max(64).required(),
    sks: Joi.string().max(64).required(),
})

const removeMatkulValidation = Joi.object({
    id: Joi.number().positive().required()
});

export {
    registerMatkulValidation,
    getMatkulValidation,
    updateMatkulValidation,
    removeMatkulValidation
}