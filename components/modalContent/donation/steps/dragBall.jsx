import React, { useState, useEffect, useRef } from "react";
import { GiCheckMark } from "react-icons/gi/index.js";
import { colors } from "../../../../config";
import { BsPersonCircle } from "react-icons/bs/index.js";
import { motion } from "framer-motion";
import { isBrowser, isMobile } from "react-device-detect";

import { TfiHandPointLeft } from "react-icons/tfi/index.js";
import Draggable from "../../../dragNDrop/draggable";

// Typo
import { H1, H2, H3, P } from "../../../typography";

// Functions
import addToUserData from "../../../../functions/addToUserData";

// Store
import useStore from "../../../../store/store";

function DragBall(props) {
    const userData = useStore((state) => state.userData);

    const nameRef = useRef();

    const handleChange = (e) => {
        const value = { name: e.target.value };
        addToUserData(value);
    };

    useEffect(() => {
        console.log(userData, userData.id);
    }, [userData]);

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 xl:mb-6 sm:mb-4">
                <H2>Schmücken Sie den Baum</H2>
                <P>Nun können Sie Ihre Kugel auf ein freies Feld bewegen. Wo möchten Sie die Kugel hinziehen?</P>
            </div>

            <motion.div
                className={`colors w-full col-span-12 grid grid-cols-12`}
                key="sum-choice"
                initial={{ x: -100, opacity: 0 }}
                animate={{ opacity: 1, x: 0, transition: { type: "spring", stiffness: 1000, damping: 80, delay: 0.1 } }}
                exit={{ x: -1000, opacity: 1 }}
            >
                <div className="col-span-2 flex items-center justify-center ">
                    <div data-tip={props.dataTip} className="text-5xl font-black opacity-50 text-[#C6D5DD]">
                        <BsPersonCircle />
                    </div>
                </div>
                <div className="col-span-9 md:col-span-9 xl:col-span-9 mt-4">
                    <div
                        className={`${
                            userData.color && userData.sum ? "scale-in-center" : "hidden"
                        }    flex items-center  w-full`}
                    >
                        <div
                            className={`w-[45%] 
                             text-right pr-5 font-bold text-primaryColor`}
                        >
                            {isMobile ? "Rauf ziehen" : "Zum Baum ziehen"}
                        </div>
                        <Draggable
                            id="draggable"
                            value="bubu"
                            style={{
                                // width: 48 + "px",
                                // height: 48 + "px",
                                background: userData.color,
                            }}
                            klasse={`${props.isDropped ? "hidden" : "block"} ${
                                props.isDragging ? "opacity-30" : ""
                            } w-7 h-7 lg:h-12 lg:w-12 rounded-full flex items-center shine justify-center touch-none heartbeat w-2/4  ${
                                userData.color == "rgb(255, 255, 255)" || userData.color == "rgb(220, 223, 220)"
                                    ? "text-black border-4"
                                    : "text-white"
                            }`}
                        >
                            {/* {anon
           ? "Anon"
           : name
                 .split(" ")
                 .map((n) => n[0])
                 .join(".")} */}
                        </Draggable>
                        <div className={` righ pl-5 text-3xl xl:text-5xl`}>
                            <TfiHandPointLeft></TfiHandPointLeft>
                        </div>
                        {/* {props.userData.id ? (
                            <div className="super font-bold text-center w-full text-[#32cd32]">Super!</div>
                        ) : null} */}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default DragBall;
