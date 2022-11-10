import React, { useRef, forwardRef } from "react";
import { isBrowser, isMobile } from "react-device-detect";

const ToolTip = (props, ref) => {
    return (
        <div
            onMouseLeave={props.onMouseLeave}
            ref={ref}
            className={`tooltip font-rucksack ${props.klasse}`}
            style={props.style}
        >
            {props.avatrSrc ? (
                <div className="grid grid-cols-12 items-center ">
                    <div className="col-span-3 sm:col-span-4">
                        <div className="avatar w-8 sm:w-12 sm:w-auto">
                            <img className="rounded-full" src={props.avatrSrc} alt="" />
                        </div>
                    </div>
                    <div className="col-span-9 sm:col-span-8 pl-4 sm:pl-4 text-xs sm:text-base">
                        <div className="font-rucksack font-normal sm:bold">{props.name}</div>
                        <div>EUR {props.sum} ,-</div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="font-rucksack sm:bold sm:pl-4 text-xs sm:text-base">{props.name}</div>
                    <div>EUR {props.sum} ,-</div>
                </>
            )}

            {props.comment && <div className="mt-3 sm:mt-6 text-xs italic font-light">{props.comment}</div>}
        </div>
    );
};

export default forwardRef(ToolTip);
