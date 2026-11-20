import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE,
    authDomain: "monikahaus-3a374.firebaseapp.com",
    projectId: "monikahaus-3a374",
    storageBucket: "monikahaus-3a374.appspot.com",
    messagingSenderId: "553695420137",
    appId: "1:553695420137:web:94759c80897f5900a51a78",
    measurementId: "G-5N4J2XYP2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };

export const donorCollectionName =
    process.env.NEXT_PUBLIC_DEV === "true" || process.env.NEXT_PUBLIC_LIVE_DB !== "true"
        ? "2026_Test"
        : "2026_Live";

export const fetchFirestoreData = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
