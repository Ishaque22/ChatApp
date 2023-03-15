
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAeM44ESJ8m5O11chOJI-taek-sccagLiM"
  authDomain: import.meta.env.VITE_REACT_APP_authDomain,
  projectId: import.meta.env.VITE_REACT_APP_projectId,
  storageBucket: import.meta.env.VITE_REACT_APP_storageBucket,
  messagingSenderId:import.meta.env.VITE_REACT_APP_messagingSenderId, 
  appId: import.meta.env.VITE_REACT_APP_appId,
};


export const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const storage = getStorage();
export const db =getFirestore()
