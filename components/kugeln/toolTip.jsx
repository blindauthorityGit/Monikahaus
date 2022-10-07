import React, { useRef, forwardRef } from "react";

const ToolTip = (props, ref) => {
    return (
        <div
            onMouseLeave={props.onMouseLeave}
            // onMouseEnter={props.onMouseEnter}
            onMouseEnter={(e) => {
                console.log(e);
            }}
            ref={ref}
            className={`tooltip ${props.klasse}`}
            style={props.style}
        >
            <div className="font-rucksack bold">{props.name}</div>
            <div>{props.sum}</div>
        </div>
    );
};

export default forwardRef(ToolTip);
