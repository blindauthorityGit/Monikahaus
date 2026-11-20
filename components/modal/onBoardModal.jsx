import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/store";
import { AiOutlineClose } from "react-icons/ai/index.js";
import useModalFocus from "./useModalFocus";

const OnBoardModal = ({ onClose, children, isOpen }) => {
    const resetUserData = useStore((state) => state.resetUserData);
    const modalRef = useRef(null);

    const handleClose = () => {
        onClose?.();
        resetUserData();
    };

    useModalFocus(isOpen, handleClose, modalRef);

    // Function to calculate animation props based on screen size
    const calculateAnimationProps = () => {
        if (window.innerWidth <= 768) {
            return {
                initial: { opacity: 0, scale: 0.8 },
                animate: {
                    opacity: 1,
                    scale: 1,

                    transition: { type: "spring", stiffness: 300, damping: 25 },
                },
                exit: { opacity: 0, scale: 0.8 },
            };
        } else {
            return {
                initial: { opacity: 0, scale: 0.4, y: "-200%", x: "0%" },
                animate: {
                    opacity: 1,
                    scale: 1,
                    y: "10%",
                    x: 0,
                    transition: { type: "spring", stiffness: 300, damping: 25 },
                },
                exit: { opacity: 0, scale: 0.8, y: "50%" },
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
            {isOpen && (
                <motion.div
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Informationen zur Spendenaktion"
                    tabIndex={-1}
                    key={isOpen ? "open" : "closed"} // Use the key prop to force re-render on animation changes
                    // initial={animationProps.initial}
                    // animate={animationProps.animate}
                    // exit={animationProps.exit}
                    transition={{ duration: 2.6 }}
                    className="z-[60] left-0 right-0 top-0  m-auto modal-container ONBOARDING   w-[90%]  min-h-[95%] sm:bottom-0 sm:h-[80%] lg:w-[50%] xl:w-[40%]  p-4 xl:p-12 "
                    style={{
                        background: "#fff",
                        borderRadius: "8px",

                        position: "absolute",
                    }}
                >
                    {/* Your modal content goes here */}
                    <button
                        type="button"
                        aria-label="Dialog schließen"
                        onClick={handleClose}
                        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-darkText transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor"
                    >
                        <AiOutlineClose aria-hidden="true" className="text-2xl" />
                    </button>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OnBoardModal;
