import React from "react";
import { motion } from "framer-motion";

export default function Overlay(props) {
    return (
        <motion.div
            className={`${props.klasse} w-full h-screen fixed bg-black opacity-70 z-40 top-0`}
            onClick={props.onClick}
        ></motion.div>
    );
}
