import express from 'express';
import{register, login, verify, changeDp,getMiniProfile,follow} from '../controllers/usersController.js';
//import { auth } from '../middleware/authMiddleware.js';


export const usersRouter = express.Router(); 
//use auth when it works
usersRouter.post ('/register', register);
usersRouter.post ('/login', login);
//create get entire UserProfile Separate.
usersRouter.patch ('/verify', verify);

usersRouter.patch ('/changeDp', changeDp);
usersRouter.get ('/getMiniProfile/:profileName', getMiniProfile);
usersRouter.post ('/follow/', follow);
