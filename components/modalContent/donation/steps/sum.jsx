import React, { useState, useEffect, useContext, useRef } from "react";

import { GiCheckMark } from "react-icons/gi/index.js";
import { colors } from "../../../../config";
import { GiPayMoney } from "react-icons/gi/index.js";
import { motion } from "framer-motion";

//Typo
import { H1, H2, H3, P } from "../../../typography";

//Fcuntions
import addToUserData from "../../../../functions/addToUserData";

//Store
import useStore from "../../../../store/store";

function Sum(props) {
    const [opacity, setOpacity] = useState(0.3);
    const userData = useStore((state) => state.userData);
    const [inputValue, setInputValue] = useState("");
    const sumRef = useRef();
    // const [isInputFocused, setInputFocused] = useState(false);

    const isInputFocused = useStore((state) => state.isInputFocused);
    const setIsInputFocused = useStore((state) => state.setIsInputFocused);
    const handleChange = (e) => {
        const value = { sum: parseFloat(e.target.value) };
        setInputValue(e.target.value);
        addToUserData(value);
    };

    const handleInputFocus = () => {
        // Check if the viewport width is less than or equal to 768 (adjust this value as needed)
        if (window.innerWidth <= 768) {
            // When the input is focused, set the focused state to true
            setIsInputFocused(true);
        }
    };

    const handleBlur = (e) => {
        // Check if the viewport width is less than or equal to 768 (adjust this value as needed)
        e.target.value = parseFloat(e.target.value).toFixed(2);

        if (window.innerWidth <= 768) {
            setIsInputFocused(false); // When the input is blurred, set the focused state to false
        }
    };

    useEffect(() => {}, []);

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 xl:mb-6 hidden lg:block">
                <H1>Schenken Sie Freude</H1>
                <P>Mit Ihrer Spende lassen wir die Wünsche unserer Kinder und Jugendlichen wahr werden. </P>
            </div>
            <motion.div
                className={`colors w-full col-span-12 grid grid-cols-12}`}
                key="sum-choice" // Add a unique key to the motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ opacity: 1, x: 0, transition: { type: "spring", stiffness: 1000, damping: 80, delay: 0.1 } }}
                exit={{ x: -1000, opacity: 1 }}
            >
                <div className="col-span-12 xl:mb-6 lg:mt-6 sm:mb-4">
                    <H2>Spendensumme</H2>
                    <P>
                        Ihre Spende hilft uns, den Alltag unserer Kinder und Jugendlichen schöner zu gestalten. Mit
                        welchem Betrag möchten Sie unsere Arbeit unterstützen?
                    </P>
                </div>
                {/* <div className="col-span-2 flex items-center ">
                    <div data-tip={props.dataTip} className="text-5xl font-black opacity-50 text-[#C6D5DD]">
                        <GiPayMoney />
                    </div>
                </div> */}
                <div className="col-span-3 md:col-span-3 lg:col-span-3 mt-2 lg:mt-0">
                    <div className={`SUMINPUTwrapper flex justify-between ${props.wrapperKlasse}`} ref={sumRef}>
                        <input
                            type="number"
                            className="SUMINPUT border-b-2 w-full text-xl lg:text-2xl xl:text-5xl py-4 font-bold pl-4"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={() => {
                                handleInputFocus();
                            }}
                            placeholder="5,00"
                            step="1"
                            value={userData.sum ? userData.sum : ""}
                            min="1"
                        />
                    </div>
                </div>
                <div className="col-span-9 py-4 flex items-center text-xl lg:text-2xl xl:text-5xl ">Euro</div>
            </motion.div>
        </div>
    );
}

export default Sum;
