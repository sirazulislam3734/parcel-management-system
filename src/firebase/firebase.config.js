// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1cJcx1pg9PN8e9i9EI4orI8RoDSl75sk",
  authDomain: "parcel-management-24b3b.firebaseapp.com",
  projectId: "parcel-management-24b3b",
  storageBucket: "parcel-management-24b3b.firebasestorage.app",
  messagingSenderId: "1085241959107",
  appId: "1:1085241959107:web:44fb402bd80774cdda3876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);