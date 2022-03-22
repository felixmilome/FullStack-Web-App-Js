import express from 'express';
import{headSearch} from '../controllers/searchController.js';
import { auth } from '../middleware/authMiddleware.js';


export const searchRouter = express.Router(); 

searchRouter.post ('/headSearch', auth, headSearch); 
