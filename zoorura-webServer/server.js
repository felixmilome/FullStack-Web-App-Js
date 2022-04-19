import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import diariesRouter from './routes/diariesRouter.js';
import {usersRouter} from './routes/usersRouter.js';
import {systemRouter} from './routes/systemRouter.js';
import {convosRouter} from './routes/convosRouter.js';
import {messagesRouter} from './routes/messagesRouter.js';
import {notificationsRouter} from './routes/notificationsRouter.js';
import {tipsRouter} from './routes/tipsRouter.js';
import {walletRouter} from './routes/walletRouter.js';
import {tagsRouter} from './routes/tagsRouter.js';
import {reviewsRouter} from './routes/reviewsRouter.js';
import {savedDiariesRouter} from './routes/savedDiariesRouter.js';
import {searchRouter} from './routes/searchRouter.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({extended: true, limit: '500mb'})); 

app.use('/system', systemRouter);
app.use('/diaries', diariesRouter); 
app.use('/users', usersRouter);
app.use('/wallet', walletRouter);
app.use('/convos', convosRouter);
app.use('/messages', messagesRouter);
app.use('/notifications/', notificationsRouter);
app.use('/reviews/', reviewsRouter);
app.use('/tips/', tipsRouter);
app.use('/tags/', tagsRouter);
app.use('/savedDiaries/', savedDiariesRouter);
app.use('/search/', searchRouter);


//app.use('/diaryfiles', diaryFilesRouter);
 
const MONGO_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log (error.message)); 
  