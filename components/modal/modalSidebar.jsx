import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/store";

import { AiOutlineClose } from "react-icons/ai/index.js";

const ModalSidebar = (props) => {
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);
    const closeModal = useStore((state) => state.closeModal);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("keydown", handleEscapeKey);
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isSidebarOpen]);

    const animationProps = {
        initial: { x: "-100%", opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 25 },
        },
        exit: { x: "-100%", opacity: 0 },
    };

    return (
        <AnimatePresence>
            {isSidebarOpen && (
                <motion.div
                    key={isSidebarOpen ? "open" : "closed"} // Use the key prop to force re-render on animation changes
                    initial={animationProps.initial}
                    animate={animationProps.animate}
                    exit={animationProps.exit}
                    transition={{ duration: 0.5 }}
                    className="sidebar-container z-50 min-h-[100svh] w-[85%] lg:w-[40%] xl:w-[38%]"
                    style={{
                        background: "#fff",
                        borderRadius: "0",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    {/* Your sidebar content goes here */}
                    <AiOutlineClose
                        className="right-4 top-4 cursor-pointer xl:text-3xl absolute transition-all duration-200 hover:text-4xl"
                        onClick={props.onClose}
                    >
                        Close Sidebar
                    </AiOutlineClose>
                    {props.children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalSidebar;
