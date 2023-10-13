import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import { signaturePortal } from "../cleaners/signaturePortal";
const fireUp = signaturePortal();



export const firebaseConfig= {
 "Firebase Details"
}


export const app = initializeApp(fireUp);
export const storage = getStorage(app);


 
