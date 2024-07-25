// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBwakVPF7V2NqQDaFuopt1u7G6bMMus1g",
  authDomain: "booklibry-474d0.firebaseapp.com",
  databaseURL: 'https://booklibry-474d0-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: "booklibry-474d0",
  storageBucket: "booklibry-474d0.appspot.com",
  messagingSenderId: "183590605562",
  appId: "1:183590605562:web:e6f0cef4a4b64446232f43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);



