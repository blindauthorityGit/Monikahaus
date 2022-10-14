import React, { useEffect, useRef, forwardRef } from "react";
import { motion } from "framer-motion";
import ToolTip from "./tooltip";

const Kugel = (props, ref) => {
    const toolTipRef = useRef();
    useEffect(() => {
        // console.log(toolTipRef);
    }, [toolTipRef.current]);
    return (
        <div
            className={`kugel relative mx-3 flex h-full items-center justify-center text-white ${props.size} ${props.klasse} rounded-full ${props.color} ${props.textColor}`}
            id={props.id}
            data-isClaimed={props.isClaimed}
            cat={props.cat}
            ref={ref}
            style={props.style}
            key={props.key}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            {props.name}
            <ToolTip
                klasse={`absolute tooltip hidden z-20 right-[${props.abstand}rem] bg-black py-8 px-10 min-w-[20rem] font-bold rounded-xl ${props.toolTipColor} ${props.toolTipAfterColor}`}
                name={props.fullName}
                sum={props.sum}
                comment={props.comment}
                style={props.toolTipStyle}
                ref={toolTipRef}
                avatrSrc={props.avatrSrc}
                onMouseEnter={(e) => {
                    console.log(e);
                }}
                onMouseLeave={props.toolTiponMouseLeave}
            ></ToolTip>
        </div>
    );
};

export default forwardRef(Kugel);
