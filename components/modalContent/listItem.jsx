import React, { forwardRef } from "react";
import { isBrowser, isMobile } from "react-device-detect";
import { BsPersonCircle } from "react-icons/bs";

function ListItem(props, ref) {
    return (
        <>
            <div
                data-id={props.e.id}
                className="wrapper listItem w-full flex items-center mt-2 mb-4 hover:bg-[#f5f5f5] relative "
                onMouseOver={(e) => {
                    props.onHover(e);
                }}
                onMouseLeave={(e) => {
                    props.onLeave(e);
                }}
                ref={ref}
            >
                <div className="left pr-6 h-full">
                    {props.e.anon ? (
                        <div className="text-6xl">
                            <BsPersonCircle></BsPersonCircle>
                        </div>
                    ) : (
                        <div className="text-6xl h-full w-full">
                            {props.e.image ? (
                                <div
                                    className="avatar w-16 h-16 bg-cover rounded-full"
                                    style={{ backgroundImage: `url(${props.e.image})` }}
                                >
                                    {/* <img className="rounded-full" src={props.e.image} alt="avtrImg" /> */}
                                </div>
                            ) : (
                                <BsPersonCircle></BsPersonCircle>
                            )}
                        </div>
                    )}
                </div>
                <div className="right text-sm sm:text-base w-auto lg:w-64">
                    <strong>{!props.e.anon ? props.e.name : "Anonymer Spender"}</strong>
                    <br />
                    Spende: EUR {props.e.sum},-
                    {props.e.comment && (
                        <div className="farRight lg:hidden mt-2 text-xs border p-2 lg:p-4 bg-[#dcdfdc]">
                            {props.e.comment}
                        </div>
                    )}
                </div>
                {props.e.comment && (
                    <div className="farRight comment hidden lg:block text-xs border p-2 lg:p-4 bg-[#dcdfdc]">
                        {props.e.comment}
                    </div>
                )}{" "}
                <hr />
            </div>
        </>
    );
}

export default forwardRef(ListItem);
