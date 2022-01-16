import express from 'express';
import{postConvo} from '../controllers/convosController.js';
import { auth } from '../middleware/authMiddleware.js';


export const convosRouter = express.Router(); 

convosRouter.post ('/convos', auth, postConvo);
