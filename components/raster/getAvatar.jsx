import React, { useEffect, useState } from "react";
import { db, storage } from "../../pages/donate";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const GetAvatar = (props) => {
    const imageListRef = ref(storage, `images/`);

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
    return <div></div>;
};

export default GetAvatar;
