import React, { forwardRef } from "react";
import { FaUserSecret } from "react-icons/fa";
import { MdPersonPin, MdPersonOff } from "react-icons/md";

const AnonChoice = (props, ref) => {
    return (
        <div ref={ref} className="grid grid-cols-12">
            <div
                onChange={props.onChangeNonAnon}
                onClick={props.onClickNonAnon}
                className="right col-span-6 flex border p-3"
                id="nonAnon"
            >
                <span className="text-4xl">
                    <MdPersonPin></MdPersonPin>
                </span>

                <div className="text-2xl  lg:text-lg">Sichtbar</div>
            </div>
            <div
                onChange={props.onChangeAnon}
                onClick={props.onClickAnon}
                className="left col-span-6 flex border p-3"
                id="anon"
            >
                <span className="text-4xl">
                    <MdPersonOff></MdPersonOff>
                </span>
                <div className="text-2xl lg:text-lg">Anonym</div>
            </div>
        </div>
    );
};

export default forwardRef(AnonChoice);
