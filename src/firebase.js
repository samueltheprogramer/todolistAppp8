// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-YPrQ0oUu_-sk1gnywXZ7thl2bdARua8",
  authDomain: "todolistapp-559f6.firebaseapp.com",
  projectId: "todolistapp-559f6",
  storageBucket: "todolistapp-559f6.appspot.com",
  messagingSenderId: "246861111024",
  appId: "1:246861111024:web:69122f95e6c90e106dac35",
  measurementId: "G-V49S38FHRW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
