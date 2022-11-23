import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../pages/donate";

function imgFetcher(link) {
    getDownloadURL(ref(storage, link)).then((url) => {
        return url;
    });
}

export default imgFetcher;
