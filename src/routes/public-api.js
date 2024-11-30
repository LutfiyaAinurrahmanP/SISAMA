import express from 'express';
import mahasiswaController from '../controller/mahasiswa-controller.js';

const publicRouter = new express.Router();
publicRouter.post('/api/mahasiswa', mahasiswaController.register);
publicRouter.post('/api/mahasiswa/login', mahasiswaController.login);
// publicRouter.get('/api/mahasiswa/current', mahasiswaController.get);

export {
    publicRouter
}