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
            key={props.key}
            whileHover={{ scale: 1.2 }}
            layout
            initial={{
                x: props.initialX,
                y: props.initialY,
                scale: props.initialScale,
                rotate: props.initialRotate,
                opacity: props.initialOpacity,
            }}
            animate={{ x: props.x, y: props.y, scale: props.scale, rotate: props.rotate, opacity: props.opacity }}
            transition={{ duration: props.duration, delay: props.delay, type: props.type }}
        >
            {props.name}
        </motion.div>
    );
};

export default forwardRef(Kugel);
