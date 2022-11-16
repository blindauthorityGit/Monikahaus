import React, { forwardRef } from "react";
import { isBrowser, isMobile } from "react-device-detect";
import { BsPersonCircle } from "react-icons/bs";

function ListItem(props, ref) {
    return (
        <>
            <div
                data-id={props.e.id}
                className="wrapper listItem w-full flex items-center mt-2 mb-4 hover:bg-[#f5f5f5]"
                onMouseOver={(e) => {
                    props.onHover(e);
                }}
                onMouseLeave={(e) => {
                    props.onLeave(e);
                }}
                ref={ref}
            >
                <div className="left pr-6">
                    {props.e.anon ? (
                        <div className="text-6xl">
                            <BsPersonCircle></BsPersonCircle>
                        </div>
                    ) : (
                        <img
                            className="rounded-full h-16 sm:h-24"
                            src={`https://i.pravatar.cc/300?img=${props.e.id}`}
                            alt="test"
                        />
                    )}
                </div>
                <div className="right text-sm sm:text-base w-auto sm:w-64">
                    <strong>{!props.e.anon ? props.e.name : "Anonymer Spender"}</strong>
                    <br />
                    Spende: EUR {props.e.sum},-
                    {props.e.comment && (
                        <div className="farRight sm:hidden mt-2 text-xs border p-2 sm:p-4 bg-[lightgray]">
                            {props.e.comment}
                        </div>
                    )}
                </div>
                {props.e.comment && (
                    <div className="farRight comment hidden sm:block text-xs border p-2 sm:p-4 bg-[lightgray]">
                        {props.e.comment}
                    </div>
                )}{" "}
                <hr />
            </div>
        </>
    );
}

export default forwardRef(ListItem);
