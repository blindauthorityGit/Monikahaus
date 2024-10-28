import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/store";
import { AiFillCloseCircle } from "react-icons/ai/index.js";

const RoundModal = ({ onClose, isOpen, children }) => {
    const resetUserData = useStore((state) => state.resetUserData);

    const isModalOpen = useStore((state) => state.isModalOpen);
    const modalPosition = useStore((state) => state.modalPosition);
    const closeModal = useStore((state) => state.closeModal);
    const modalHeight = useStore((state) => state.modalHeight);
    // const setModalHeight = useStore((state) => state.setModalHeight);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("keydown", handleEscapeKey);
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isModalOpen]);

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
                <AiFillCloseCircle
                    className="right-4 top-4 lg:right-20 cursor-pointer text-3xl text-white xl:text-3xl absolute transition-all duration-200 hover:text-4xl"
                    onClick={() => {
                        onClose();
                    }}
                >
                    Close Sidebar
                </AiFillCloseCircle>
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default RoundModal;
