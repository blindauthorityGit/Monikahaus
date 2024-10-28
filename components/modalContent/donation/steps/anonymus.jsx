import React, { useState, useEffect, useRef } from "react";
import { GiCheckMark } from "react-icons/gi/index.js";
import { colors } from "../../../../config";
import { BsIncognito } from "react-icons/bs/index.js";
import { motion } from "framer-motion";

// Typo
import { H1, H2, H3, P } from "../../../typography";

// Functions
import addToUserData from "../../../../functions/addToUserData";

// Store
import useStore from "../../../../store/store";

function Anonymous(props) {
    const userData = useStore((state) => state.userData);
    const [isAnonymous, setIsAnonymous] = useState(userData.isAnonymous || false);

    const sumRef = useRef();

    const handleChange = (e) => {
        const value = { sum: e.target.value };
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
                    <H2>Anonyme Spende?</H2>
                    <P>
                        Wir möchten sicherstellen, dass Sie sich wohl fühlen. Möchten Sie Ihre Spende anonym tätigen
                        oder Ihre Daten mit uns teilen?
                    </P>
                </div>
                <div className="col-span-2 flex items-center justify-center mt-4 lg:mt-0">
                    <div data-tip={props.dataTip} className="text-5xl font-black opacity-50 text-[#C6D5DD]">
                        <BsIncognito />
                    </div>
                </div>
                <div className="col-span-9 md:col-span-9 xl:col-span-9 mt-6 lg:mt-4">
                    <div className={`wrapper flex justify-between ${props.wrapperKlasse}`} ref={sumRef}>
                        {/* Use the custom switch component for the anonymous toggle */}
                        <div className="flex items-center text-xl">
                            {/* Conditionally render "Sichtbar" or "Anonym" */}
                            <span
                                onClick={() => {
                                    setIsAnonymous(true);
                                }}
                                className={`mr-2 ${isAnonymous ? "font-bold" : null}`}
                            >
                                Anonym
                            </span>
                            <div
                                className={`w-16 h-6 rounded-full cursor-pointer transition flex items-center ${
                                    isAnonymous ? "bg-gray-300" : "bg-greenColor"
                                }`}
                                onClick={handleAnonymousToggle}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full shadow-md transform transition ${
                                        isAnonymous ? "translate-x-0 bg-greenColor" : "translate-x-10 bg-white"
                                    }`}
                                >
                                    {/* {!isAnonymous && <GiCheckMark color="white" className="mx-2" />} */}
                                </div>
                            </div>
                            <span
                                onClick={() => {
                                    setIsAnonymous(false);
                                }}
                                className={`ml-2 ${!isAnonymous ? "font-bold" : null}`}
                            >
                                Sichtbar
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 bg-greenColor-50 p-4 mt-8 hidden lg:block lg:text-sm">
                    {isAnonymous ? (
                        <div>Ihre Spende bleibt anonym. Name wird nicht angezeigt.</div>
                    ) : (
                        <div>
                            Sie können in den nächsten Schritten Ihren Namen eingeben und ein Bild hinzufügen, das neben
                            Ihrer Spende angezeigt wird.
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default Anonymous;
