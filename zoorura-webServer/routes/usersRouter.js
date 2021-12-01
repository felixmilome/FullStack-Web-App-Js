import express from 'express';
import{register, login} from '../controllers/usersController.js';


export const usersRouter = express.Router(); 

usersRouter.post ('/register', register);
usersRouter.post ('/login', login);
