import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import diariesRouter from './routes/diariesRouter.js ';
//import diaryFilesRouter from './routes/diaryFilesRouter';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'})); 
app.use('/diaries', diariesRouter);
//app.use('/diaryfiles', diaryFilesRouter);

const MONGO_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log (error.message));
  