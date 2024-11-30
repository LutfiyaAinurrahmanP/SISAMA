import Joi from 'joi';

const registerMahasiswaValidation = Joi.object({
    nim: Joi.string().max(64).required(),
    password: Joi.string().max(64).required(),
    nama: Joi.string().max(64).required(),
    prodi: Joi.string().max(64).required(),
    angkatan: Joi.string().max(64).required(),
    email: Joi.string().max(64).email().required()
});

export {
    registerMahasiswaValidation
}