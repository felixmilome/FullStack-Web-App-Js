import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import { signaturePortal } from "../cleaners/signaturePortal";
const fireUp = signaturePortal();



export const firebaseConfig= {
  apiKey: "AizaSy4R_U3l0T-Qmc8-bXjBn9d6N2ZC7avB5ZU",
  authDomain: "zooruraweb.firebaseapp.com",
  projectId: "zooruraweb",
  storageBucket: "zooruraweb.appspot.com",
  messagingSenderId: "210173924032", 
  appId: "1:210073924035:web:bO36e6fb9763903d2c09ef",
  measurementId: "G-1SXEzX0M0E" 
}


export const app = initializeApp(fireUp);
export const storage = getStorage(app);


 
