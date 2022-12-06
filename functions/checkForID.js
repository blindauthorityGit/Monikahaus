import { db } from "../config/firebase";

import { dev } from "../config";

// import { app, db, storage } from "../config/firebase";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";

export const checkForID = async (id) => {
    try {
        const spenderCol = collection(db, dev ? "test" : "spender");
        const spenderSnapshot = await getDocs(spenderCol);
        const spenderList = spenderSnapshot.docs.map((doc) => doc.data());
        const result = spenderList.some((e) => e.id === id);
        // setTimeout(() => {
        //     return result;
        // }, 500);
        // console.log(result);
        return result;
    } catch (e) {
        console.log("error");
    }
};
