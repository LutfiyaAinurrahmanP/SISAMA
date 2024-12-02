import express from 'express';
import { publicRouter } from '../routes/public-api.js';
import { dosenRouter, mahasiswaRouter } from '../routes/token-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use('/api/mahasiswa', mahasiswaRouter);
web.use('/api/dosen', dosenRouter);


web.use(errorMiddleware);