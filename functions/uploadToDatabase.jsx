import uploadImageAndGetURL from "./uploadImageAndGetURL"; // Import the image upload function
import saveUserDataToFirestore from "./saveDataToFirestore"; // Import the image upload function
import { fetchFirestoreData } from "../config/firebase";

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

        if (JSON.parse(process.env.NEXT_PUBLIC_DEV)) {
            const newUserList = [...userList, updatedUserData];
            console.log(newUserList);
            setUserList(newUserList);
            setShowOverlay(true);
            setShowSuccess(true);
        } else {
            // Save the updated userData to Firestore
            await saveUserDataToFirestore(updatedUserData);

            // Fetch the updated user list
            const data = await fetchFirestoreData(
                JSON.parse(process.env.NEXT_PUBLIC_LIVE_DB) ? "2025_Live" : "2025_Test"
            );
            setUserList(data);
            setShowOverlay(true);
            setShowSuccess(true);
        }
        console.log(userList);

        closeModal();
        setShowUnclaimed(false);
    } catch (error) {
        console.error("Error handling continue:", error);
    }
};

export default uploadToDatabase;
