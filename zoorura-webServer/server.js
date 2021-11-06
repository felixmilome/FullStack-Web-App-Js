import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import diariesRouter from './routes/diariesRouter.js ';  
 

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'})); 
app.use('/diaries', diariesRouter);

const UNGANO = 'mongodb+srv://zoorura:February2021!@cluster0.ckcub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(UNGANO, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log (error.message));
  