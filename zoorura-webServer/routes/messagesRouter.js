import express from 'express';
import{postMessage, getMessages} from '../controllers/messagesController.js';
import { auth } from '../middleware/authMiddleware.js';


export const messagesRouter = express.Router(); 

messagesRouter.post ('/', auth, postMessage);

messagesRouter.get ('/:convoId', auth, getMessages);
