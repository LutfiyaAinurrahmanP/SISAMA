import Joi from "joi";

const registerJadwalKuliahValidation = Joi.object({
    hari: Joi.string().max(64).required(),
    jam_mulai: Joi.string().max(64).required(),
    jam_selesai: Joi.string().max(64).required(),
    ruangan: Joi.string().max(64).required(),
});

export {
    registerJadwalKuliahValidation
}