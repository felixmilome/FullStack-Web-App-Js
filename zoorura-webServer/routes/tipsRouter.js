import express from 'express';
import{postTip, getTips} from '../controllers/tipsController.js';
import { auth } from '../middleware/authMiddleware.js';


export const tipsRouter = express.Router(); 

tipsRouter.post ('/', auth, postTip);

tipsRouter.get ('/:postId', auth, getTips);
