import React, { useRef, forwardRef } from "react";
import { motion } from "framer-motion";

const Kugel = (props, ref) => {
    return (
        <motion.div
            className={`kugel mx-3 flex h-full items-center justify-center text-white ${props.size} rounded-full ${props.color}`}
            id={props.id}
            data-isClaimed={props.isClaimed}
            cat={props.cat}
            ref={ref}
            style={props.style}
            whileHover={{ scale: 1.2 }}
        >
            {props.name}
        </motion.div>
    );
};

export default forwardRef(Kugel);
