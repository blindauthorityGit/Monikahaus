import { addDoc, collection } from "firebase/firestore/lite";
import { db, donorCollectionName } from "../config/firebase";

const saveUserDataToFirestore = async (userData) => {
    try {
        // Specify the collection name where you want to store the data
        const collectionRef = collection(db, donorCollectionName);
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
