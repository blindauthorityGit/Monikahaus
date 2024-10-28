import React from "react";
import { useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";
import FloaterButton from "./floatButton";
// ICONS
import { BsFillPeopleFill, BsFillInfoCircleFill } from "react-icons/bs/index.js";
import { AiOutlineSafetyCertificate } from "react-icons/ai/index.js";

const StartFloaterFull = (props) => {
    const sidebar = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
            },
        }),
        closed: {
            clipPath: "circle(30px at 40px 40px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
    };

    return (
        <div className="absolute z-[29] right-0 top-8">
            <FloaterButton klasse="flex justify-center items-center mb-2" onClick={props.onClickPeople}>
                <BsFillPeopleFill />
            </FloaterButton>
            <FloaterButton klasse="flex justify-center items-center mb-2" onClick={props.onClickInfo}>
                <BsFillInfoCircleFill />
            </FloaterButton>
            <FloaterButton klasse="flex justify-center items-center" onClick={props.onClickPrivacy}>
                <AiOutlineSafetyCertificate />
            </FloaterButton>
        </div>
    );
};

export default StartFloaterFull;
