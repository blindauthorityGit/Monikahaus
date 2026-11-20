import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/store";

import { AiOutlineClose } from "react-icons/ai/index.js";
import useModalFocus from "./useModalFocus";

const ModalSidebar = (props) => {
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);
    const sidebarRef = useRef(null);

    useModalFocus(isSidebarOpen, props.onClose, sidebarRef);

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
                    ref={sidebarRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={props.ariaLabel || "Seitenleiste"}
                    tabIndex={-1}
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
                    <button
                        type="button"
                        aria-label="Seitenleiste schließen"
                        onClick={props.onClose}
                        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-darkText transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor"
                    >
                        <AiOutlineClose aria-hidden="true" className="text-2xl" />
                    </button>
                    {props.children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalSidebar;
