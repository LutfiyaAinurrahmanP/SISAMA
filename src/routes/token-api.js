import express from 'express';
import mahasiswaController from '../controller/mahasiswa-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const tokenRouter = new express.Router();
tokenRouter.use(authMiddleware);

// Mahasiswa Router
tokenRouter.get('/api/mahasiswa/current', mahasiswaController.get);

export {
    tokenRouter
}