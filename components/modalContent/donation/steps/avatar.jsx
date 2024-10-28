import React, { useState, useEffect, useRef } from "react";
import { GiCheckMark } from "react-icons/gi/index.js";
import { colors, maxSize, avatars } from "../../../../config";
import { BsPersonCircle } from "react-icons/bs/index.js";
import { motion } from "framer-motion";

//Image Upload STuff
import ImageUploading from "react-images-uploading";
import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";

// Typo
import { H1, H2, H3, P } from "../../../typography";

// Functions
import addToUserData from "../../../../functions/addToUserData";

// Store
import useStore from "../../../../store/store";

function Avatar(props) {
    const userData = useStore((state) => state.userData);

    const [images, setImages] = useState(userData.image || []);
    const [error, setError] = useState(false);
    const [size, setSize] = useState(0);
    const maxNumber = 1;

    const imgRef = useRef();

    const [checked, setChecked] = useState(-1);

    const onChange = async (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        if (imageList.length > 0) {
            const fileSizeMB = imageList[0].file.size / 1024 ** 2;
            setSize(fileSizeMB);
            console.log(fileSizeMB);
            if (fileSizeMB <= maxSize) {
                setImages(imageList);
                setError(false);
            } else {
                setError(true);
            }
        } else {
            // Handle the case when the imageList is empty (no images)
            setSize(0);
            setImages([]);
            setError(false);
        }
    };

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    // useEffect(() => {
    //     console.log(images, images[0]);
    //     if (images.length != 0) {
    //         addToUserData({ image: images });
    //         // setUserData({ ...userData, image: images });
    //     } else {
    //         addToUserData({ image: null });
    //     }
    // }, [images]);
    useEffect(() => {
        const compressAndAddToUserData = async () => {
            if (images.length !== 0) {
                const compressedBlob = await imageCompression(images[0].file, {
                    maxSizeMB: 1, // Set your desired max size
                    maxWidthOrHeight: 400, // Set your desired max width or height
                });

                // Convert Blob to File
                const compressedFile = new File([compressedBlob], images[0].file.name, {
                    type: images[0].file.type,
                    lastModified: images[0].file.lastModified,
                });

                addToUserData({ image: compressedFile });
            } else {
                addToUserData({ image: null });
            }
        };

        compressAndAddToUserData();
    }, [images]);

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 xl:mb-6 hidden lg:block">
                <H1>Schenken Sie Freude</H1>
                <P>Mit Ihrer Spende lassen wir die Wünsche unserer Kinder und Jugendlichen wahr werden.</P>
            </div>

            <motion.div
                className={`colors w-full col-span-12 grid grid-cols-12`}
                key="sum-choice"
                initial={{ x: -100, opacity: 0 }}
                animate={{ opacity: 1, x: 0, transition: { type: "spring", stiffness: 1000, damping: 80, delay: 0.1 } }}
                exit={{ x: -1000, opacity: 1 }}
            >
                <div className="col-span-12 xl:mb-6 lg:mt-6 sm:mb-4">
                    <H2>Ihr Bild</H2>
                    <P>
                        Wenn Sie möchten, können Sie Ihren Beitrag noch persönlicher gestalten. Stellen Sie uns ein Bild
                        zur Verfügung, das neben Ihrem Namen erscheint (optional, max. 5 MB).
                    </P>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <div data-tip={props.dataTip} className="text-5xl font-black opacity-50 text-[#C6D5DD]">
                        <BsPersonCircle />
                    </div>
                </div>
                <div className="col-span-10 md:col-span-9 xl:col-span-9 ">
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            <div className={`upload__image-wrapper  grid grid-cols-12 mt-4 lg:mt-0`}>
                                <button
                                    className={`${
                                        images.length == 0 ? "" : "hidden"
                                    }  text-base sm:text-xl xl:text-2xl p-4 font-semibold opacity-30 col-span-6 sm:col-span-6 text-left hover:opacity-100`}
                                    onClick={() => {
                                        onImageUpload();
                                    }}
                                    {...dragProps}
                                >
                                    Bild wählen ...
                                </button>
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item  col-span-12 sm:col-span-8 p-4 flex ">
                                        <div
                                            className="rounded-full h-12 w-12 lg:h-20 lg:w-20 bg-cover"
                                            style={{ backgroundImage: `url(${image["data_url"]})`, aspectRatio: "1/1" }}
                                            alt=""
                                        />
                                        <div className="image-item__btn-wrapper w-full sm:w-full ml-4 flex lg:block">
                                            <button
                                                className="font-bold px-6 py-2 hover:bg-gray-200 mr-4 bg-gray-100 text-xs rounded-xl"
                                                onClick={() => onImageUpdate(index)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="font-bold lg:mt-4 hover:bg-gray-600 px-6 py-2 text-gray-50 bg-black text-xs rounded-xl"
                                                onClick={() => onImageRemove(index)}
                                            >
                                                Löschen
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="error col-span-6">
                                    {error && (
                                        <p className="text-red-600 text-xs font-bold">
                                            Bild zu groß ({size.toFixed(2)}MB)<br></br>Max {maxSize}MB, bitte anderes
                                            Bild wählen
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </ImageUploading>
                </div>
                {/* <div className="col-span-12 flex justify-center mt-8 mb-6">oder wählen Sie einen unserer Avatare:</div>
                <div className="col-span-9 md:col-span-6 xl:col-span-6">
                    <div className={`wrapper flex justify-between ${props.wrapperKlasse}`} ref={imgRef}>
                        {avatars.map((e, i) => {
                            console.log(e.src);
                            const ballVariants = {
                                hidden: { opacity: 0, scale: 0, y: -30 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    scale: 1,
                                    transition: { type: "just", delay: i * 0.05 },
                                },
                                exit: {
                                    // Define the exit animation variant
                                    opacity: 0,
                                    scale: 0,
                                    transition: { duration: 0.2 }, // You can customize the exit transition
                                },
                            };

                            return (
                                <img
                                    className={`colorBall w-16 h-16 rounded-full flex items-center justify-center ${
                                        e === "#fff" || e === "rgb(255, 255, 255)" ? "border-4" : ""
                                    } hover:scale-110 transition cursor-pointer`}
                                    onClick={(e) => {
                                        onChangeColor(e);
                                        e.target.classList.add("jello-horizontal");
                                    }}
                                    onAnimationEnd={(e) => {
                                        e.target.classList.remove("jello-horizontal");
                                    }}
                                    src={e.src}
                                    id="color"
                                    data-id={i}
                                    key={`farbKugel${i}`}
                                    style={{
                                        width: props.size + "px",
                                        height: props.size + "px",
                                        background: e,
                                    }}
                                >
                        
                                </img>
                            );
                        })}
                    </div>
                </div> */}
            </motion.div>
        </div>
    );
}

export default Avatar;
