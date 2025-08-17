// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFevtI8E6Z2ptz0mSd0kqfew5xLwOR9lU",
    authDomain: "east-flash.firebaseapp.com",
    projectId: "east-flash",
    storageBucket: "east-flash.firebasestorage.app",
    messagingSenderId: "339705020740",
    appId: "1:339705020740:web:704e5c74c1db183f129711",
    measurementId: "G-XQYF248D46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);