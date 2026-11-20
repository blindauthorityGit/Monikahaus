import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/store";
import { AiOutlineClose } from "react-icons/ai/index.js";
import useModalFocus from "./useModalFocus";

const Modal = ({ onClose, children }) => {
    const resetUserData = useStore((state) => state.resetUserData);

    const isModalOpen = useStore((state) => state.isModalOpen);
    const modalHeight = useStore((state) => state.modalHeight);
    const setModalHeight = useStore((state) => state.setModalHeight);
    const modalRef = useRef(null);

    const handleClose = () => {
        onClose?.();
        resetUserData();
    };

    useModalFocus(isModalOpen, handleClose, modalRef);

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

        if (window.innerWidth < 321) {
            // Conditionally execute handleNext() based on window width
            setModalHeight("66%");
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [window.innerWidth]);

    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Spenden"
                    tabIndex={-1}
                    key={isModalOpen ? "open" : "closed"} // Use the key prop to force re-render on animation changes
                    initial={animationProps.initial}
                    animate={animationProps.animate}
                    exit={animationProps.exit}
                    transition={{ duration: 2.6 }}
                    className={`modal-container z-50 bottom-0 lg:bottom-auto h-[47%] w-full sm:w-[75%]  sm:h-[40%] lg:h-[80%] lg:w-[40%] sm:left-[12%] p-4 sm:p-8 lg:p-12 xl:p-12 overflow-hidden`}
                    style={{
                        background: "#fff",
                        borderRadius: "8px",
                        position: "fixed",
                        height: modalHeight,
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
                    <div className="max-height-full">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
