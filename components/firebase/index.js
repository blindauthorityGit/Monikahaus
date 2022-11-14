// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from "firebase";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQAvM7L_wh22VQHwbq6IBT2Fyc01jIIHY",
    authDomain: "spendenbaum-john.firebaseapp.com",
    projectId: "spendenbaum-john",
    storageBucket: "spendenbaum-john.appspot.com",
    messagingSenderId: "987219338463",
    appId: "1:987219338463:web:e23928a16b675c4bff356a",
    measurementId: "G-08CDZPFB9W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export default firebase;
