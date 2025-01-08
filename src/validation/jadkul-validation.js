import Joi from "joi";

const registerJadkulValidation = Joi.object({
    nama_mk: Joi.string().max(64).required(),
    nama: Joi.string().max(64).required(),
    hari: Joi.string().max(64).required(),
    jam_mulai: Joi.string().max(64).required(),
    jam_selesai: Joi.string().max(64).required(),
    ruangan: Joi.string().max(64).required(),
});


export {
    registerJadkulValidation
}