import express from 'express';
import{saveDiaries, getSavedDiaries, deleteSavedDiaries} from '../controllers/savedDiariesController.js';
import { auth } from '../middleware/authMiddleware.js';


export const savedDiariesRouter = express.Router(); 

savedDiariesRouter.post ('/', auth, saveDiaries); 
savedDiariesRouter.get ('/', auth,  getSavedDiaries);
savedDiariesRouter.delete ('/:savedId', auth, deleteSavedDiaries);
