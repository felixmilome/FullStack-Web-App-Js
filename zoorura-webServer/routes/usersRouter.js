import express from 'express';
import{register, login, verify, changeDp,getMiniProfile,follow, dailyPoints, checkEmail,checkUsername} from '../controllers/usersController.js';
import { auth } from '../middleware/authMiddleware.js';


export const usersRouter = express.Router(); 

usersRouter.post ('/register', register);
usersRouter.post ('/login', login);
usersRouter.patch ('/verify', auth, verify);
usersRouter.get ('/checkEmail/:email', checkEmail);
usersRouter.get ('/checkUsername/:username', checkUsername);


usersRouter.get ('/getMiniProfile/:profileName', getMiniProfile);
usersRouter.patch ('/changeDp', auth, changeDp);
usersRouter.patch ('/dailyPoints/:id', auth, dailyPoints);
usersRouter.post ('/follow/', auth, follow);

//connfirm auth usage
//create get entire UserProfile Separate.