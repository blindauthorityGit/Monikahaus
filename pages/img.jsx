import React, { useState, useEffect } from "react";
import { db, storage } from "./donate";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import uuid from "react-uuid";

function searchByID(id, array) {
    array.map((e) => {
        if (e.split("%2F")[1].split("_")[0] == id) {
            console.log(e);
            return e;
        }
    });
}

const Img = () => {
    const [imageUpload, setImageUpload] = useState(null);

    // DARSTELLUNG
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, `images/`);

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + uuid() + "?id=5"}`);
        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                alert("Image Uploaded");
                return getDownloadURL(snapshot.ref);
            })
            .then((url) => {
                console.log(url);
            });
    };

    useEffect(() => {
        console.log(db, storage, uuid());
        listAll(imageListRef).then((res) => {
            console.log(res);
            res.items.forEach((item, i) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    useEffect(() => {
        console.log(imageList);
        searchByID(0, imageList);
    }, [imageList]);

    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                }}
            />
            <button onClick={uploadImage}>Upload Image</button>
            {imageList.map((e, i) => {
                console.log(e.split("%2F")[1].split("_")[0]);
                return <img key={i} src={e} alt="" />;
            })}
        </div>
    );
};

export default Img;
