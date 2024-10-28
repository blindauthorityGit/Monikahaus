import React, { useState, useEffect, useContext, useRef } from "react";

import { GiCheckMark } from "react-icons/gi/index.js";
import { colors } from "../../../../config";
import { BiSolidColor } from "react-icons/bi/index.js";
import { motion, AnimatePresence } from "framer-motion";
import { fade } from "framer-motion"; // Import the exit animation

//Typo
import { H1, H3, P } from "../../../typography";

//Fcuntions
import addToUserData from "../../../../functions/addToUserData";
import hexToRGB from "../../../../functions/hexToRGB";

//Store
import useStore from "../../../../store/store";

function BallChoice(props) {
    const [checked, setChecked] = useState(-1);
    const userData = useStore((state) => state.userData);

    const ballRef = useRef();

    const onChangeColor = (e) => {
        let arr = Array.from(ballRef.current.querySelectorAll(".colorBall"));
        arr.map((e) => e.children[0].classList.add("hidden"));
        arr[e.currentTarget.dataset.id].children[0].classList.remove("hidden");
        arr[e.currentTarget.dataset.id].children[0].classList.add("block");
        console.log(arr[e.currentTarget.dataset.id].children[0]);
        const newData = { color: e.currentTarget.style.backgroundColor };
        console.log(newData);
        addToUserData(newData);
        setChecked(e.currentTarget.dataset.id);

        // Call the onColorChosen callback with the chosen color
        if (props.onColorChosen) {
            props.onColorChosen(newData.color);
        }
        // setUserData({ ...userData, [e.currentTarget.id]: e.currentTarget.style.backgroundColor });
        // setDonateData({ ...donateData, [e.currentTarget.id]: e.currentTarget.style.backgroundColor });
        // console.log(userData);

        // setColor(e.currentTarget.style.backgroundColor);
        // setKugelColor({ ...kugelColor, color: e.currentTarget.style.backgroundColor });
    };

    const addChecked = (index) => {
        let arr = Array.from(ballRef.current.querySelectorAll(".colorBall"));
        console.log(arr);
        arr.map((e) => e.children[0].classList.add("hidden"));
        arr[index].children[0].classList.remove("hidden");
        arr[index].children[0].classList.add("block");
    };

    useEffect(() => {
        const hexedColors = colors.bgColors.map((e) => hexToRGB(e));
        // console.log(userData);
        const selectedColorIndex = hexedColors.findIndex((color) => color === userData.color);
        console.log(selectedColorIndex);
        // Set the checked state to the index if the color is found, otherwise set it to -1 (no color selected)
        setChecked(selectedColorIndex !== -1 ? selectedColorIndex : -1);
        selectedColorIndex !== -1 ? addChecked(selectedColorIndex) : null;
    }, []);

    return (
        <motion.div
            className={`colors w-full}`}
            key="ball-choice" // Add a unique key to the motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ opacity: 1, x: 0, transition: { type: "spring", stiffness: 1000, damping: 80, delay: 0.1 } }}
            exit={{ x: -1000, opacity: 1 }}
        >
            <div className="grid grid-cols-12">
                <div className="col-span-12 sm:mb-4 xl:mb-6">
                    <H1 klasse="xl:text-6xl">Schenken Sie Hoffnung!</H1>
                    <P klasse=" xl:mt-16 xl:mb-12">
                        Wir sammeln Spenden für die Kinder und Jugendlichen des Kinder- und Familienzentrum Monikahaus.
                    </P>
                    <H3 klasse="font-bold mt-4 lg:mt-8">Wählen Sie Ihre Kugel: </H3>
                </div>
                <div className="col-span-2 flex items-center ">
                    <div data-tip={props.dataTip} className="text-5xl font-black opacity-50 text-[#C6D5DD]">
                        <BiSolidColor />
                    </div>
                </div>
                <div className="col-span-9 md:col-span-6 lg:col-span-8 flex flex-col justify-center">
                    <div className={`wrapper flex justify-between ${props.wrapperKlasse}`} ref={ballRef}>
                        {colors.bgColors.map((e, i) => {
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
                                <motion.div
                                    className={`colorBall shine shadow-md rounded-full flex items-center justify-center ${
                                        e === "#fff" || e === "rgb(255, 255, 255)" ? "border-4" : ""
                                    } hover:scale-110 transition cursor-pointer w-7 h-7 lg:w-10 lg:h-10 xl:w-12 xl:h-12`}
                                    onClick={(e) => {
                                        onChangeColor(e);
                                        e.target.classList.add("jello-horizontal");
                                    }}
                                    onAnimationEnd={(e) => {
                                        e.target.classList.remove("jello-horizontal");
                                    }}
                                    id="color"
                                    data-id={i}
                                    key={`farbKugel${i}`}
                                    style={{
                                        // width: props.size + "px",
                                        // height: props.size + "px",
                                        background: e,
                                    }}
                                    variants={ballVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ borderRadius: "50%", borderWidth: "8px" }}
                                    exit="exit"
                                >
                                    <div className="icon hidden text-base xl:text-2xl">
                                        <GiCheckMark color={checked == 4 ? "black" : "white"}></GiCheckMark>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default BallChoice;
