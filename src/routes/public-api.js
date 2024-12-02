import express from 'express';
import mahasiswaController from '../controller/mahasiswa-controller.js';
import dosenController from '../controller/dosen-controller.js';

const publicRouter = new express.Router();

// Mahasiswa Router
publicRouter.post('/api/mahasiswa', mahasiswaController.register);
publicRouter.post('/api/mahasiswa/login', mahasiswaController.login);

// Dosen Router
publicRouter.post('/api/dosen', dosenController.register);
publicRouter.post('/api/dosen/login', dosenController.login);


export {
    publicRouter
}