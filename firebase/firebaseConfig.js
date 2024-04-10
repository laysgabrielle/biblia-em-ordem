// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRyj9n_O11U4jiRJ0IVOONtWagmmLk82Q",
  authDomain: "ordem-lab.firebaseapp.com",
  projectId: "ordem-lab",
  storageBucket: "ordem-lab.appspot.com",
  messagingSenderId: "299185378405",
  appId: "1:299185378405:web:8f8b7566cea54b03dee28c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

