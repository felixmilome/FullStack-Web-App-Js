import express from 'express';

//import {multerUpload} from "../utils/multer.js"

import { getDiaries, postDiaries, patchDiaries, deleteDiaries } from '../controllers/diariesController.js';

     

const diariesRouter = express.Router();    

diariesRouter.get('/', getDiaries); 
diariesRouter.post('/', postDiaries);     
//diariesRouter.post('/', multerUpload.single('file'), postDiaries); 
diariesRouter.patch('/:id', patchDiaries); 
diariesRouter.delete('/:id', deleteDiaries);

export default diariesRouter; 