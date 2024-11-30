import express from 'express';
import mahasiswaController from '../controller/mahasiswa-controller.js';

const publicRouter = new express.Router();
publicRouter.post('/api/mahasiswa', mahasiswaController.register);

export {
    publicRouter
}