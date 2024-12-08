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

const updateMahasiswaValidation = Joi.object({
    id: Joi.number().positive().required(),
    nim: Joi.string().max(64).required(),
    password: Joi.string().max(64).required(),
    nama: Joi.string().max(64).required(),
    prodi: Joi.string().max(64).required(),
    angkatan: Joi.string().max(64).required(),
    email: Joi.string().max(64).email().required()
})

const removeMahasiswaValidation = Joi.object({
    id: Joi.number().positive().required(),
})

const logoutMahasiswaValidation = Joi.object({
    id: Joi.number().positive().required(),
    // nim: Joi.string().max(64).required(),
    // password: Joi.string().max(64).required(),
})


export {
    registerMahasiswaValidation,
    loginMahasiswaValidation,
    getMahasiswaValidation,
    updateMahasiswaValidation,
    removeMahasiswaValidation,
    logoutMahasiswaValidation
}