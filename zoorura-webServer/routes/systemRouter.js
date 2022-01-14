import express from 'express';
import{getHallFame} from '../controllers/systemController.js';
import { auth } from '../middleware/authMiddleware.js';

export const systemRouter = express.Router(); 
systemRouter.get('/hallFame', getHallFame); 