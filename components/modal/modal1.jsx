import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/store";

const Modal = ({ onClose }) => {
    const isModalOpen = useStore((state) => state.isModalOpen);
    const modalPosition = useStore((state) => state.modalPosition);
    const closeModal = useStore((state) => state.closeModal);

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
                initial: { opacity: 0, scale: 0.8, y: "50%", x: "-50%" },
                animate: {
                    opacity: 1,
                    scale: 1,
                    y: "50%",
                    x: 0,
                    transition: { type: "spring", stiffness: 300, damping: 25 },
                },
                exit: { opacity: 0, scale: 0.8, y: "50%" },
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
            {isModalOpen && (
                <motion.div
                    key={isModalOpen ? "open" : "closed"} // Use the key prop to force re-render on animation changes
                    initial={animationProps.initial}
                    animate={animationProps.animate}
                    exit={animationProps.exit}
                    transition={{ duration: 2.6 }}
                    className="modal-container z-50 h-[80%] xl:w-[40%]"
                    style={{
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "20px",
                        position: "fixed",
                        left: "10%",
                        transform: "translate(0%, 0%)",
                    }}
                >
                    {/* Your modal content goes here */}
                    <button onClick={onClose}>Close Modal</button>
                    oikheioheoi
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;