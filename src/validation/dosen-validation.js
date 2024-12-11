import Joi from 'joi';

const registerDosenValidation = Joi.object({
    nip: Joi.string().max(64).required(),
    password: Joi.string().max(64).required(),
    nama: Joi.string().max(64).required(),
    email: Joi.string().max(64).email().required(),
    jabatan: Joi.string().max(64).required(),
});

const loginDosenValidation = Joi.object({
    nip: Joi.string().max(64).required(),
    password: Joi.string().max(64).required()
})

const getDosenValidation = Joi.object({
    id: Joi.number().positive().required(),
});

const updateDosenValidation = Joi.object({
    id: Joi.number().positive().required(),
    nip: Joi.string().max(64).required(),
    password: Joi.string().max(64).required(),
    nama: Joi.string().max(64).required(),
    email: Joi.string().max(64).email().required(),
    jabatan: Joi.string().max(64).required(),
});

const removeDosenValidation = Joi.object({
    id: Joi.number().positive().required()
});

const logoutDosenValidation = Joi.object({
    id: Joi.number().positive().required()
});

export {
    registerDosenValidation,
    loginDosenValidation,
    getDosenValidation,
    updateDosenValidation,
    removeDosenValidation,
    logoutDosenValidation
}