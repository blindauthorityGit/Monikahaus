import React, { useState, useEffect, useRef } from "react";
import { GiCheckMark } from "react-icons/gi/index.js";
import { colors } from "../../../../config";
import { BiCommentDots } from "react-icons/bi/index.js";
import { motion } from "framer-motion";

// Typo
import { H1, H2, H3, P } from "../../../typography";

// Functions
import addToUserData from "../../../../functions/addToUserData";

// Store
import useStore from "../../../../store/store";

function Comment(props) {
    const userData = useStore((state) => state.userData);
    const [isAnonymous, setIsAnonymous] = useState(userData.isAnonymous || false);

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
        const value = { comment: e.target.value };
        addToUserData(value);
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
                    <H2>Ihr Kommentar</H2>
                    <P>Gerne können Sie auch einen Kommentar abgeben (optional, max. 60 Zeichen). </P>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <div data-tip={props.dataTip} className="text-5xl font-black opacity-50 text-[#C6D5DD]">
                        <BiCommentDots />
                    </div>
                </div>
                <div className="col-span-9 md:col-span-9 xl:col-span-9 mt-4">
                    <div className={`wrapper flex justify-between ${props.wrapperKlasse}`} ref={nameRef}>
                        <textarea
                            className="text-base sm:text-xl p-4 font-semibold w-full "
                            rows="2"
                            cols="40"
                            name="comment"
                            id="comment"
                            maxLength="60"
                            placeholder="Ihr Kommentar (max. 60 Zeichen)"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={() => {
                                handleInputFocus();
                            }}
                            value={userData.comment}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Comment;
