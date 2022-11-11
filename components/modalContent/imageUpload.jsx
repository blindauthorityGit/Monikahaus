import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";

import { MdPhotoCamera } from "react-icons/md";

function ImageUpload(props) {
    const [images, setImages] = useState([]);
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <div className="name grid grid-cols-12 mt-2 sm:mt-6 ">
            <div className="col-span-2 flex items-center">
                <div data-tip={props.dataTip} className="text-xl sm:text-5xl font-black opacity-50">
                    <MdPhotoCamera />{" "}
                </div>
            </div>
            <div className="col-span-10">
                <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        // write your building UI
                        <div className="upload__image-wrapper grid grid-cols-12">
                            <button
                                style={isDragging ? { color: "red" } : undefined}
                                className="text-base sm:text-3xl p-4 font-semibold opacity-30 col-span-6 sm:col-span-4 text-left hover:opacity-100"
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Bild wählen ...
                            </button>
                            &nbsp;
                            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item col-span-7 p-4 flex ">
                                    <div
                                        className="rounded-full h-20 w-20 bg-cover"
                                        height="80px"
                                        style={{ backgroundImage: `url(${image["data_url"]})` }}
                                        // src={image["data_url"]}
                                        alt=""
                                        width="100"
                                    />
                                    <div className="image-item__btn-wrapper ml-4">
                                        <button
                                            className="font-bold px-6 py-2 hover:bg-gray-200 bg-gray-100 rounded-xl"
                                            onClick={() => onImageUpdate(index)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="font-bold mt-4 hover:bg-gray-200 px-6 py-2 bg-gray-100 rounded-xl"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            Löschen
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
        </div>
    );
}

export default ImageUpload;
