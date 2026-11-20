import uploadImageAndGetURL from "./uploadImageAndGetURL"; // Import the image upload function
import saveUserDataToFirestore from "./saveDataToFirestore"; // Import the image upload function
import { donorCollectionName, fetchFirestoreData } from "../config/firebase";

const uploadToDatabase = async (
    userData,
    setUserList,
    setShowOverlay,
    setShowSuccess,
    setShowUnclaimed,
    closeModal,
    userList
) => {
    try {
        let updatedUserData = { ...userData };

        if (userData.image) {
            // Upload the image and get the URL
            const imageDownloadURL = await uploadImageAndGetURL(userData.image);
            console.log(imageDownloadURL);
            // Update the userData with the image download URL
            updatedUserData = {
                ...updatedUserData,
                image: imageDownloadURL,
            };
        }
        console.log("updatedUserData", updatedUserData);

        // Save to the collection selected for this environment (2026_Test in dev).
        await saveUserDataToFirestore(updatedUserData);

        // Fetch the updated user list from Firestore.
        const data = await fetchFirestoreData(donorCollectionName);
        setUserList(data);
        setShowOverlay(true);
        setShowSuccess(true);
        console.log(userList);

        closeModal();
        setShowUnclaimed(false);
    } catch (error) {
        console.error("Error handling continue:", error);
    }
};

export default uploadToDatabase;
