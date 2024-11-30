import Joi from 'joi';

const registerMahasiswaValidation = Joi.object({
    nim: Joi.string().max(64).required(),
    password: Joi.string().max(64).required(),
    nama: Joi.string().max(64).required(),
    prodi: Joi.string().max(64).required(),
    angkatan: Joi.string().max(64).required(),
    email: Joi.string().max(64).email().required()
});

const loginMahasiswaValidation = Joi.object({
    nim: Joi.string().max(64).required(),
    password: Joi.string().max(64).required()
})

const getMahasiswaValidation = Joi.string().max(100).required();


export {
    registerMahasiswaValidation,
    loginMahasiswaValidation,
    getMahasiswaValidation
}