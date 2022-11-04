import React from "react";
import { motion } from "framer-motion";
import SuccessTop from "../../assets/successTop.svg";
import SuccessTopRed from "../../assets/successTopRed.svg";
import { H1 } from "../utils/headlines";
import { MdOutlineClose } from "react-icons/md";
const ThankYou = (props) => {
    return (
        <motion.div
            layout
            initial={{
                x: "50%",
                y: 1200,
                scale: 1,
                rotate: 0,
            }}
            animate={{ x: "50%", y: props.closeMe ? 700 : 20.685, scale: 1, rotate: 0 }}
            transition={{ duration: "30ms", delay: 1.5, type: "spring" }}
            className={`fixed flex justify-start items-center flex-col h-full max-h-[90%] fade-in w-[90%] lg:w-[32%] min-h-[60%] ${
                props.isWinner ? "bg-winner" : "bg-success"
            } bg-success p-8 lg:p-16 z-50 `}
        >
            <div
                className="closer absolute top-6 right-6 text-4xl cursor-pointer text-white transition hover:opacity-50 z-50"
                onClick={props.onClick}
            >
                <MdOutlineClose></MdOutlineClose>
            </div>

            <img src={props.isWinner ? SuccessTopRed.src : SuccessRed.src} alt="" />
            <H1 klasse="text-3xl md:text-5xl text-center lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl text-white">
                {props.isWinner ? "Sie haben gewonnen!" : "Vielen Dank!"}
            </H1>
            <p className="text-white mt-12">Ihre Kugel schmückt nun den Baum</p>
            {props.isWInner ? <div>Herzlichen Glückwunsch, Sie haben gewonnen!</div> : null}
            {props.children}
        </motion.div>
    );
};

export default ThankYou;
