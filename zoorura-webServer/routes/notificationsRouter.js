import express from 'express';

//import {multerUpload} from "../utils/multer.js"

import { getNotifications, postNotifications, readNotifications, readConvoNotifications } from '../controllers/notificationsController.js';
import { auth } from '../middleware/authMiddleware.js';
     

export const notificationsRouter = express.Router();     

notificationsRouter.get('/:id', auth, getNotifications); 
notificationsRouter.post('/', auth, postNotifications);
notificationsRouter.patch('/:id', auth, readNotifications);
notificationsRouter.delete('/readConvoNotifications/:convoId', auth, readConvoNotifications);  

