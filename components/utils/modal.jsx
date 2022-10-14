import React from "react";

import { MdOutlineClose } from "react-icons/md";
const Modal = (props) => {
    return (
        <div className="fixed overflow-y-auto max-h-[100%] fade-in w-[90%] lg:w-[50%] min-h-[100%] bg-white p-8 lg:p-24 z-50 ">
            <div
                className="closer absolute top-6 right-6 text-4xl cursor-pointer transition hover:opacity-50 z-50"
                onClick={props.onClick}
            >
                <MdOutlineClose></MdOutlineClose>
            </div>
            {props.children}
        </div>
    );
};

export default Modal;
