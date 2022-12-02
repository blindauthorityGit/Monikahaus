import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE,
    authDomain: "spendenbaum-john.firebaseapp.com",
    projectId: "spendenbaum-john",
    storageBucket: "spendenbaum-john.appspot.com",
    messagingSenderId: "987219338463",
    appId: "1:987219338463:web:e23928a16b675c4bff356a",
    measurementId: "G-08CDZPFB9W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
