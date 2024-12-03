import Joi from "joi";

const registerAdminValidation = Joi.object({
    nama: Joi.string().max(64).required(),
    username: Joi.string().max(64).required(),
    password: Joi.string().max(64).required()
});

const loginAdminValidation = Joi.object({
    username: Joi.string().max(64).required(),
    password: Joi.string().max(64).required()
});

const getAdminValidation = Joi.number().positive().required();

export {
    registerAdminValidation,
    loginAdminValidation,
    getAdminValidation
}