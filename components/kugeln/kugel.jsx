import React, { useState, useEffect, useRef, forwardRef } from "react";
import { motion } from "framer-motion";
import ToolTip from "./toolTip";
import { useDroppable } from "@dnd-kit/core";

import Droppable from "../dragNDrop/droppable";

const Kugel = (props, ref) => {
    const toolTipRef = useRef();
    useEffect(() => {
        // console.log(toolTipRef);
    }, [toolTipRef.current]);

    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
        disabled: props.disabled,
    });
    const style = {
        color: isOver ? "green" : undefined,
    };

    return (
        <div
            className={`kugel relative mx-3 flex h-full items-center text-bold ${
                isOver ? "bg-red-600 " : ""
            } justify-center text-white ${props.size} ${props.klasse} rounded-full ${props.color} ${props.textColor}`}
            id={props.id}
            data-isClaimed={props.isClaimed}
            cat={props.cat}
            ref={setNodeRef}
            style={props.style}
            key={props.key}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            disabled={props.disabled}
            onAnimationEnd={props.onAnimationEnd}
            data-isWinner={props.winner}
        >
            <>
                {props.name}
                {props.children}
            </>
            <ToolTip
                klasse={`absolute tooltip hidden z-20 right-[${props.abstand}rem] bg-black py-8 px-10 min-w-[20rem] font-bold rounded-xl ${props.toolTipColor} ${props.toolTipAfterColor}`}
                name={props.fullName}
                sum={props.sum}
                comment={props.comment}
                style={props.toolTipStyle}
                ref={toolTipRef}
                avatrSrc={props.avatrSrc}
                onMouseLeave={props.toolTiponMouseLeave}
            ></ToolTip>
        </div>
    );
};

export default forwardRef(Kugel);
