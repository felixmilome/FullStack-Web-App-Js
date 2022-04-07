import express from 'express';

//import {multerUpload} from "../utils/multer.js"

import { getDiaries, postDiaries, patchDiaries, deleteDiaries, tipDiaries, reviewDiaries } from '../controllers/diariesController.js';
import { auth } from '../middleware/authMiddleware.js';
     

const diariesRouter = express.Router();    

diariesRouter.get('/', auth, getDiaries); 
diariesRouter.post('/', auth, postDiaries);     
diariesRouter.patch('/:id', auth, patchDiaries); 
diariesRouter.delete('/:id', auth, deleteDiaries);
diariesRouter.patch('/:id/tipDiaries', auth, tipDiaries);
diariesRouter.patch('/:id/reviewDiaries', auth, reviewDiaries);

//diariesRouter.post('/', multerUpload.single('file'), postDiaries); 

export default diariesRouter; 