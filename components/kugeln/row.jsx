import React from "react";

const Row = (props) => {
    return (
        <div className={`row line ${props.klasse}`}>
            <div className="flex justify-center h-full">{props.children}</div>
        </div>
    );
};

export default Row;
