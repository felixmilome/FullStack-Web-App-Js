import express from 'express';
import{register, login, verify, changeDp,getMiniProfile} from '../controllers/usersController.js';
//import { auth } from '../middleware/authMiddleware.js';


export const usersRouter = express.Router(); 
//use auth when it works
usersRouter.post ('/register', register);
usersRouter.post ('/login', login);
usersRouter.patch ('/verify', verify);

usersRouter.patch ('/changeDp', changeDp);
usersRouter.get ('/getMiniProfile/:profileName', getMiniProfile);
