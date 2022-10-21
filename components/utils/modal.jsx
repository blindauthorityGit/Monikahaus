import React from "react";
import { motion } from "framer-motion";

import { MdOutlineClose } from "react-icons/md";
const Modal = (props) => {
    return (
        <motion.div className="fixed overflow-y-auto max-h-[100%] fade-in w-[90%] lg:w-[50%] min-h-[100%] bg-white p-8 lg:p-24 z-50 ">
            <div
                className="closer absolute top-6 right-6 text-4xl cursor-pointer transition hover:opacity-50 z-50"
                onClick={props.onClick}
                layout
                initial={{
                    x: 257.14,
                    y: 900,
                    scale: 1,
                    rotate: 0,
                }}
                animate={{ x: 257.14, y: props.closeMe ? 700 : 531.685, scale: 1, rotate: 0 }}
                transition={{ duration: props.duration, delay: props.delay, type: "spring" }}
            >
                <MdOutlineClose></MdOutlineClose>
            </div>
            {props.children}
        </motion.div>
    );
};

export default Modal;
