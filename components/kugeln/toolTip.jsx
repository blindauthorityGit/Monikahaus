import React, { useState, useEffect, useRef, forwardRef } from "react";
import { isBrowser, isMobile } from "react-device-detect";
import { BsPersonCircle } from "react-icons/bs";

const ToolTip = (props) => {
    const avatarRef = useRef();
    const [heigh, setHeight] = useState(0);

    useEffect(() => {
        if (avatarRef.current != undefined) {
            console.log(avatarRef.current.clientWidth);
            setHeight(avatarRef.current.clientWidth);
        }
        console.log(props.avatrSrc);
    }, []);

    return (
        <div onMouseLeave={props.onMouseLeave} className={`tooltip font-rucksack ${props.klasse}`} style={props.style}>
            {props.avatrSrc ? (
                <div className="grid grid-cols-12 items-center relative">
                    <div className="col-span-3 lg:col-span-4 h-full">
                        <div className="avatar w-8 sm:w-12 sm:w-auto h-full">
                            {props.isAnon || !props.avatrSrc ? (
                                <div className="text-3xl md:text-4xl">
                                    <BsPersonCircle></BsPersonCircle>
                                </div>
                            ) : (
                                <div
                                    ref={avatarRef}
                                    className="w-full h-full relative"
                                    // style={{ backgroundImage: `url(${props.avatrSrc})`, height: heigh + "px" }}
                                >
                                    <div
                                        className="avatar text-3xl md:text-4xl w-full h-full  rounded-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${props.avatrSrc})`, height: "auto" }}
                                    >
                                        <img className="rounded-full" src={props.avatrSrc} alt="avtrImg" />
                                    </div>
                                    {/* <img src={props.avatrSrc} alt="" /> */}
                                    {/* <img src={imgFetcher(props.avatrSrc)} alt="" />
                                    <img src={imgFetcher(props.avatrSrc)} alt="" /> */}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-span-9 sm:col-span-8 pl-4 lg:pl-4 text-xs sm:text-base">
                        <div className="font-rucksack font-normal sm:font-bold">{props.name}</div>
                        <div>EUR {props.sum} ,-</div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-12 items-center relative">
                    <div className="col-span-3 lg:col-span-4 h-full">
                        <div className="avatar w-8 sm:w-12 sm:w-auto h-full">
                            <div className="text-3xl md:text-4xl">
                                <BsPersonCircle></BsPersonCircle>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-9 sm:col-span-8 pl-4 lg:pl-4 text-xs sm:text-base">
                        <div className="font-rucksack font-normal sm:font-bold">{props.name}</div>
                        <div>EUR {props.sum} ,-</div>
                    </div>
                </div>
            )}

            {props.comment && (
                <div className="mt-3 lg:mt-3 text-xs md:text-base italic font-light">{props.comment}</div>
            )}
        </div>
    );
};

export default forwardRef(ToolTip);
