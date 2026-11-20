import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai/index.js";
import useModalFocus from "./useModalFocus";

const RoundModal = ({ onClose, isOpen, children }) => {
    const modalRef = useRef(null);

    useModalFocus(isOpen, onClose, modalRef);

    // Function to calculate animation props based on screen size
    const calculateAnimationProps = () => {
        if (window.innerWidth <= 768) {
            return {
                initial: { opacity: 0 },
                animate: {
                    opacity: 1,

                    transition: { type: "spring", stiffness: 300, damping: 25 },
                },
                exit: { opacity: 0 },
            };
        } else {
            return {
                initial: { opacity: 0 },
                animate: {
                    opacity: 1,

                    transition: { type: "spring", stiffness: 300, damping: 25 },
                },
                exit: { opacity: 0 },
            };
        }
    };

    const [animationProps, setAnimationProps] = useState(calculateAnimationProps());

    useEffect(() => {
        const handleResize = () => {
            setAnimationProps(calculateAnimationProps());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label="Spendenbestätigung"
                tabIndex={-1}
                key={isOpen ? "open" : "closed"} // Use the key prop to force re-render on animation changes
                initial={animationProps.initial}
                animate={animationProps.animate}
                exit={animationProps.exit}
                transition={{ duration: 2.6 }}
                className={`ROUNDMODAL w-[80%] lg:w-[50%] px-8 py-4 rounded-full modal-container z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                style={{
                    background: "#fff",
                    aspectRatio: "1/1",
                }}
            >
                {/* Your modal content goes here */}
                <button
                    type="button"
                    aria-label="Bestätigung schließen"
                    onClick={onClose}
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-darkText transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor lg:right-20"
                >
                    <AiFillCloseCircle aria-hidden="true" className="text-2xl" />
                </button>
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default RoundModal;
