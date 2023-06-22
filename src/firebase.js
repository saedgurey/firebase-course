// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB471WrDzgg5lvE75ibmuWqRHt7bnyx3OM",
  authDomain: "fir-course-9e470.firebaseapp.com",
  projectId: "fir-course-9e470",
  storageBucket: "fir-course-9e470.appspot.com", 
  messagingSenderId: "254618113697",
  appId: "1:254618113697:web:c08fa10f9275c1b3a8c2e0",
  measurementId: "G-2NYSLN58P7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app);