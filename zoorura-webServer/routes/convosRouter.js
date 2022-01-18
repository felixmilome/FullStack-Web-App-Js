import express from 'express';
import{getConvos, postConvo,
     //patchConvo, deleteConvo
    } from '../controllers/convosController.js';
import { auth } from '../middleware/authMiddleware.js';


export const convosRouter = express.Router(); 

convosRouter.get ('/:id', auth, getConvos); 
convosRouter.post ('/', auth, postConvo);
// convosRouter.patch ('/:id', auth, patchConvo);   
// convosRouter.delete ('/:id', auth, deleteConvo);  
