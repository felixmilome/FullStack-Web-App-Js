import express from 'express';

//import {multerUpload} from "../utils/multer.js"

import { getDiaries, getADiary, getUsersDiaries, postDiaries, patchDiaries, deleteDiaries, tipDiaries, reviewDiaries } from '../controllers/diariesController.js';
import { auth } from '../middleware/authMiddleware.js';
     

const diariesRouter = express.Router();    
 
diariesRouter.get('/', auth, getDiaries);
diariesRouter.get('/usersDiaries/:userId', auth, getUsersDiaries);
diariesRouter.get('/:diaryId', auth, getADiary); 
diariesRouter.post('/', auth, postDiaries);     
diariesRouter.patch('/:id', auth, patchDiaries); 
diariesRouter.delete('/:id', auth, deleteDiaries);
diariesRouter.patch('/:id/tipDiaries', auth, tipDiaries);
diariesRouter.patch('/:id/reviewDiaries', auth, reviewDiaries);

//diariesRouter.post('/', multerUpload.single('file'), postDiaries); 

export default diariesRouter; 