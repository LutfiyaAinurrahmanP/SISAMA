import express from 'express';
import mahasiswaController from '../controller/mahasiswa-controller.js';
import dosenController from '../controller/dosen-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { authDosen } from '../middleware/auth-dosen.js';
import { authMahasiswa } from '../middleware/auth-mahasiswa.js';

const mahasiswaRouter = new express.Router();
const dosenRouter = new express.Router();

// Rute Mahasiswa
mahasiswaRouter.use(authMahasiswa);
mahasiswaRouter.get('/api/mahasiswa/current', mahasiswaController.get);
mahasiswaRouter.patch('/api/mahasiswa/:mahasiswaId', mahasiswaController.update);
mahasiswaRouter.delete('/api/mahasiswa/:mahasiswaId', mahasiswaController.remove);
mahasiswaRouter.delete('/api/mahasiswa/logout/:mahasiswaId', mahasiswaController.logout);

// Rute Dosen
dosenRouter.use(authDosen);
dosenRouter.get('/api/dosen/current', dosenController.get);

export {
    mahasiswaRouter,
    dosenRouter
};
