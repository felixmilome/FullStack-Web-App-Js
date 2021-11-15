
import multer from "multer";
import path from "path";

export const multerUpload = multer({
 storage: multer.diskStorage({}),
 fileFilter: (req,file,cb) =>
{
    let ext =path.extname(file.original);
    if(ext !==".jpg" && ext !== ".jpeg" && ext !==".png" && ext !==".pdf" && ext !==".mp4" ){
        cb(new Error ("file extension error"), false);
        return;
    }
    cb(null,true);
},

});