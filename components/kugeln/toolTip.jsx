import React, { useRef, forwardRef } from "react";

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
                    <div className="col-span-4">
                        <div className="avatar">
                            <img className="rounded-full" src={props.avatrSrc} alt="" />
                        </div>
                    </div>
                    <div className="col-span-8 pl-4">
                        <div className="font-rucksack bold">{props.name}</div>
                        <div>EUR {props.sum} ,-</div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="font-rucksack bold">{props.name}</div>
                    <div>EUR {props.sum} ,-</div>
                </>
            )}

            {props.comment && <div className="mt-6 text-sm font-light">{props.comment}</div>}
        </div>
    );
};

export default forwardRef(ToolTip);
