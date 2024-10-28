import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../config/firebase";

const saveUserDataToFirestore = async (userData) => {
    try {
        // Specify the collection name where you want to store the data
        const collectionRef = collection(db, JSON.parse(process.env.NEXT_PUBLIC_LIVE_DB) ? "2024_Live" : "2024_Test");
        console.log("LOG UISERDATA: ", userData);
        // Add the user data to the collection
        await addDoc(collectionRef, userData);

        // Return true to indicate success
        console.log("DATA WAS SAVED");
        return true;
    } catch (error) {
        console.error("Error saving user data:", error);
        // Return false to indicate failure
        return false;
    }
};

export default saveUserDataToFirestore;
