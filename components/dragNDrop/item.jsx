// import React from "react";

// const Item = (props) => {
//     return <div className="tester absolute w-10 h-10 bg-red-500">{props.value}</div>;
// };

import React, { forwardRef } from "react";

const Item = ({ children, ...props }, ref) => {
    return (
        <div ref={ref} style={props.style} {...props} className={`tester  w-10 h-10 bg-red-500 ${props.klasse}`}>
            {children}
        </div>
    );
};

export default forwardRef(Item);
