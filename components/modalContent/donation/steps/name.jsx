import React, { useState, useEffect, useRef } from "react";
import { GiCheckMark } from "react-icons/gi/index.js";
import { colors } from "../../../../config";
import { BsPersonCircle } from "react-icons/bs/index.js";
import { motion } from "framer-motion";

// Typo
import { H1, H2, H3, P } from "../../../typography";

// Functions
import addToUserData from "../../../../functions/addToUserData";

// Store
import useStore from "../../../../store/store";

function Name(props) {
    const userData = useStore((state) => state.userData);

    const setIsInputFocused = useStore((state) => state.setIsInputFocused);

    const handleInputFocus = () => {
        // Check if the viewport width is less than or equal to 768 (adjust this value as needed)
        if (window.innerWidth <= 768) {
            // When the input is focused, set the focused state to true
            setIsInputFocused(true);
        }
    };

    const handleBlur = (e) => {
        // Check if the viewport width is less than or equal to 768 (adjust this value as needed)

        if (window.innerWidth <= 768) {
            setIsInputFocused(false); // When the input is blurred, set the focused state to false
        }
    };

    const nameRef = useRef();

    const handleChange = (e) => {
        const value = { name: e.target.value };
        addToUserData(value);
    };

    const handleAnonymousToggle = () => {
        const updatedIsAnonymous = !isAnonymous;
        setIsAnonymous(updatedIsAnonymous);
        addToUserData({ isAnonymous: updatedIsAnonymous });
    };

    useEffect(() => {
        console.log(userData);
    }, [userData]);

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
                    <H2>Ihr Name</H2>
                    <P>Nennen Sie uns Ihren Namen. Dieser wird dann auf Ihrer Spendenkugel angezeigt. </P>
                </div>
                <div className="col-span-2 flex items-center justify-center mt-4 lg:mt-0">
                    <div data-tip={props.dataTip} className="text-5xl font-black opacity-50 text-[#C6D5DD]">
                        <BsPersonCircle />
                    </div>
                </div>
                <div className="col-span-9 md:col-span-9 xl:col-span-9 mt-4">
                    <div className={`wrapper flex justify-between ${props.wrapperKlasse}`} ref={nameRef}>
                        <input
                            type="text"
                            className="border-b-2 w-full text-xl xl:text-3xl py-4 font-bold pl-4"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={() => {
                                handleInputFocus();
                            }}
                            placeholder="Ihr Name"
                            value={userData.name}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Name;
