import express from 'express';
import{getWallet} from '../controllers/walletController.js';
import { auth } from '../middleware/authMiddleware.js';


export const walletRouter = express.Router(); 

walletRouter.get ('/', auth, getWallet); 
 
