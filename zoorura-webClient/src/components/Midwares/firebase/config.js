import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
 
const firebaseConfig = {
    apiKey: "AIzaSyAR_U3loT-Qmc8-bXjBn6d9N22C9avB5ZU",
    authDomain: "zooruraweb.firebaseapp.com",
    projectId: "zooruraweb",
    storageBucket: "zooruraweb.appspot.com",
    messagingSenderId: "210073924030",
    appId: "1:210073924030:web:b036e6fb9763903d2c09ef",
    measurementId: "G-1SXEYXQM0E"
  };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);