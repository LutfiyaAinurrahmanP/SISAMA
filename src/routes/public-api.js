import express from 'express';
import mahasiswaController from '../controller/mahasiswa-controller.js';
import dosenController from '../controller/dosen-controller.js';
import adminController from '../controller/admin-controller.js';

const publicRouter = new express.Router();

// Mahasiswa Router
publicRouter.post('/api/mahasiswa', mahasiswaController.register);
publicRouter.post('/api/mahasiswa/login', mahasiswaController.login);

// Dosen Router
publicRouter.post('/api/dosen', dosenController.register);
publicRouter.post('/api/dosen/login', dosenController.login);

// Admin router
publicRouter.post('/api/admin', adminController.register);
publicRouter.post('/api/admin/login', adminController.login);

export {
    publicRouter
}