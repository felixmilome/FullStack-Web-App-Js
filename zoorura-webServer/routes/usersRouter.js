import express from 'express';
import{register, login, verify,sendOtp, block,unblock, populateBlock, changeDp,getMiniProfile,follow, dailyPoints, deleteAccount, checkEmail,checkUsername, editProfile, editSecurity, forgotPassword} from '../controllers/usersController.js';
import { auth } from '../middleware/authMiddleware.js';


export const usersRouter = express.Router(); 

usersRouter.post ('/register', register);
usersRouter.post ('/login', login);
usersRouter.patch ('/verify', verify);
usersRouter.get ('/sendOtp/:email', auth, sendOtp);
usersRouter.get ('/checkEmail/:email', checkEmail);
usersRouter.get ('/checkUsername/:username', checkUsername);


usersRouter.get ('/getMiniProfile/:profileName',auth, getMiniProfile); 
usersRouter.patch ('/changeDp', auth, changeDp);
usersRouter.patch ('/dailyPoints/:id', auth, dailyPoints);
usersRouter.post ('/follow/', auth, follow);
usersRouter.patch ('/editProfile', auth, editProfile);
usersRouter.patch ('/editSecurity', auth, editSecurity);
usersRouter.patch ('/forgotPassword', forgotPassword);
usersRouter.patch ('/block',auth, block);
usersRouter.patch ('/unblock', auth, unblock);
usersRouter.patch ('/populateBlock',auth, populateBlock);

usersRouter.post ('/deleteAccount', auth, deleteAccount);

//connfirm auth usage
//create get entire UserProfile Separate.