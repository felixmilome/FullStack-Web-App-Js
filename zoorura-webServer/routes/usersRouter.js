import express from 'express';
import{register, login, verify,sendOtp, changeDp,getMiniProfile,follow, dailyPoints, checkEmail,checkUsername, editProfile, editSecurity} from '../controllers/usersController.js';
import { auth } from '../middleware/authMiddleware.js';


export const usersRouter = express.Router(); 

usersRouter.post ('/register', register);
usersRouter.post ('/login', login);
usersRouter.patch ('/verify', auth, verify);
usersRouter.get ('/sendOtp/:email', auth, sendOtp);
usersRouter.get ('/checkEmail/:email', checkEmail);
usersRouter.get ('/checkUsername/:username', checkUsername);


usersRouter.get ('/getMiniProfile/:profileName', getMiniProfile); 
usersRouter.patch ('/changeDp', auth, changeDp);
usersRouter.patch ('/dailyPoints/:id', auth, dailyPoints);
usersRouter.post ('/follow/', auth, follow);
usersRouter.patch ('/editProfile', auth, editProfile);
usersRouter.patch ('/editSecurity', auth, editSecurity);

//connfirm auth usage
//create get entire UserProfile Separate.