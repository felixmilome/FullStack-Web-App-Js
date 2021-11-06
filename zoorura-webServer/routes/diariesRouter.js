import express from 'express';

import { getDiaries, postDiaries, patchDiaries, deleteDiaries } from '../controllers/diariesController.js';

     

const diariesRouter = express.Router();    

diariesRouter.get('/', getDiaries);     
diariesRouter.post('/', postDiaries); 
diariesRouter.patch('/:id', patchDiaries); 
diariesRouter.delete('/:id', deleteDiaries);

export default diariesRouter; 