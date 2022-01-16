import express from 'express';
import{postMessage} from '../controllers/messagesController.js';
import { auth } from '../middleware/authMiddleware.js';


export const messagesRouter = express.Router(); 

messagesRouter.post ('/convos', auth, postMessage);
