import React from "react";

const Kugel = (props) => {
    return (
        <div
            className={`kugel mx-3 flex h-full items-center justify-center text-white ${props.size} rounded-full ${props.color}`}
            id={props.id}
            data-isClaimed={props.isClaimed}
            cat={props.cat}
        >
            {props.name}
        </div>
    );
};

export default Kugel;
