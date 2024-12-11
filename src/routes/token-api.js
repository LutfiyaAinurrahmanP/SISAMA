import express from 'express';
import mahasiswaController from '../controller/mahasiswa-controller.js';
import dosenController from '../controller/dosen-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { authDosen } from '../middleware/auth-dosen.js';
import { authMahasiswa } from '../middleware/auth-mahasiswa.js';
import adminController from '../controller/admin-controller.js';
import { authAdmin } from '../middleware/auth-admin.js';
import matkulController from '../controller/matkul-controller.js';
import jadkulController from '../controller/jadkul-controller.js';

const mahasiswaRouter = new express.Router();
const dosenRouter = new express.Router();
const adminRouter = new express.Router();

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

// Route Admin
adminRouter.use(authAdmin);
adminRouter.get('/current', adminController.get);
adminRouter.patch('/:adminId', adminController.update);
adminRouter.delete('/:adminId', adminController.remove);
adminRouter.delete('/logout/:adminId', adminController.logout);

// Route Mata Kuliah by Admin
adminRouter.post('/matkul', matkulController.register);
adminRouter.get('/matkul/:matkulId', matkulController.get);
adminRouter.get('/matkul/', matkulController.getMany);
adminRouter.patch('/matkul/:matkulId', matkulController.update);
adminRouter.delete('/matkul/:matkulId', matkulController.remove);

// Route Jadwal Kuliah by admin
adminRouter.post('/jadkul', jadkulController.register);



export {
    mahasiswaRouter,
    dosenRouter,
    adminRouter
};
