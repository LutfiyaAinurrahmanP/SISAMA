import Joi from "joi";

const registerMataKuliahValidation = Joi.object({
    kode_mk: Joi.string().max(64).required(),
    nama_mk: Joi.string().max(64).required(),
    sks: Joi.string().max(64).required()
});

const getMataKuliahValidation = Joi.object({
    id: Joi.number().positive().required()
});

const getManyMataKuliahValidation = Joi.object({
    id: Joi.number().positive().required()
});

const updateMataKuliahValidation = Joi.object({
    id: Joi.number().positive().required(),
    kode_mk: Joi.string().max(64).required(),
    nama_mk: Joi.string().max(64).required(),
    sks: Joi.string().max(64).required()
});

const removeMataKuliahValidation = Joi.object({
    id: Joi.number().positive().required()
})

export {
    registerMataKuliahValidation,
    getMataKuliahValidation,
    getManyMataKuliahValidation,
    updateMataKuliahValidation,
    removeMataKuliahValidation,
}