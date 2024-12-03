import express from 'express';
import mahasiswaController from '../controller/mahasiswa-controller.js';
import dosenController from '../controller/dosen-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { authDosen } from '../middleware/auth-dosen.js';
import { authMahasiswa } from '../middleware/auth-mahasiswa.js';

const mahasiswaRouter = new express.Router();
const dosenRouter = new express.Router();

// Route Mahasiswa
mahasiswaRouter.use(authMahasiswa);
mahasiswaRouter.get('/current', mahasiswaController.get);
mahasiswaRouter.patch('/:mahasiswaId', mahasiswaController.update);
mahasiswaRouter.delete('/:mahasiswaId', mahasiswaController.remove);
mahasiswaRouter.delete('/logout/:mahasiswaId', mahasiswaController.logout);

// Route Dosen
dosenRouter.use(authDosen);
dosenRouter.get('/current', dosenController.get);
dosenRouter.patch('/:dosenId', dosenController.update);
dosenRouter.delete('/:dosenId', dosenController.remove);
dosenRouter.delete('/logout/:dosenId', dosenController.logout);

export {
    mahasiswaRouter,
    dosenRouter
};
