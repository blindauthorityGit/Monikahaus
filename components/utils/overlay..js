import React from "react";

export default function Overlay(props) {
    return (
        <div
            className={`${props.klasse} w-full h-screen fixed bg-black opacity-70 z-40 top-0`}
            onClick={props.onClick}
        ></div>
    );
}
