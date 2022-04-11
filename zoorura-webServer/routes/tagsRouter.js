import express from 'express';
import{getTags} from '../controllers/tagsController.js';
import { auth } from '../middleware/authMiddleware.js';


export const tagsRouter = express.Router(); 

tagsRouter.post('/getTags/', auth, getTags); 

