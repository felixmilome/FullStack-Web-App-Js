import {storage} from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';

  const uploadDp = (croppedImage, imageName) =>{
        if (!croppedImage) return;
        const storageRef = ref (storage, `/dps/${imageName}`);
        const uploadTask=uploadBytesResumable(storageRef,croppedImage);
    
        uploadTask.on("state-changed", (snapshot)=>{
            const prog = Math.round(
                (snapshot.bytesTransferred/ snapshot.totalBytes)* 100
                );
            setProgress(prog);
        },
        (err) => console.log(err),
        () => {
           getDownloadURL(uploadTask.snapshot.ref).then((url)=> console.log(url)); 
        }
        );
    };