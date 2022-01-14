import mongoose from 'mongoose';
import {GridFsStorage} from 'multer-gridfs-storage';
import express, { Router } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path, { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const diaryFilesRouter = express.Router();   

const MONGO_URL = process.env.MONGO_URL;
const conn = mongoose.createConnection(MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
});

let gfs;
conn.once('open', ()=>{
    gfs = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'diaryFiles'
    });
});  

const storage = new GridFsStorage({
    url: MONGO_URL,
    options:{useUnifiedTopology:true},
        file: (req, file) =>{
            return new Promise((resolve,reject)=> {
                crypto.randomBytes(16,(err, buf)=> {
                    if(err){
                        return reject(err);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename:filename,
                         bucketName: 'image'
                    };
                    resolve(fileInfo);
                
                });
            });
        },
    });
        

    const store = multer ({
        storage,
        limits: {fileSize: 50000000},
        fileFilter: function (req,file, cb){
            checkFileType(file,cb)
        }
    })

    function checkFileType(file, cb){
        const filetypes = /jpeg|jpg|png|gif|png|mp4|mp3/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) return cb(null, true);
        cd('filetype');
    }

    const uploadMiddleware = (req, res, next) => {
        const upload = store.single('image');
        upload (req, res, function (err){
            if (err instanceof multer.MulterError){
                return res.status(400).send('File too Large');

            }else if (err){
                if (err ==='filetype') return res.atatus(400).send('Bad Format');
                return res.sendStatus(500);
            }
            next();
        })
    }

   diaryFilesRouter.post ( '/upload/', uploadMiddleware, async (req,res)=>{
       const file = req.file.path;
       const {id} = file;
       if (file.size > 50000000) {

            const deleteImage = id => {
                if (!id || id === 'undefined') return res.status(400).send('no image id');
                const _id = new mongoose.Types.ObjectId(id);
                gfs.delete(_id,err =>{
                    if (err) return res.status(500).send('image deletion error');
                })
            }
            
           deleteImage(id);
           return res.status(400).send('file may not exceed 50 mb');
       }
       console.log('uploaded file', file);
       return res.send(file.id);
   });

 