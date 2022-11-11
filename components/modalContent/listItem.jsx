import React from "react";
import { isBrowser, isMobile } from "react-device-detect";

function ListItem(props) {
    return (
        <>
            <div
                data-id={props.e.id}
                className="wrapper flex items-center mt-2 mb-4 hover:bg-[#f5f5f5]"
                onMouseOver={(e) => {
                    props.onHover(e);
                }}
                onMouseLeave={(e) => {
                    props.onLeave(e);
                }}
            >
                <div className="left pr-6">
                    <img
                        className="rounded-full h-16 sm:h-24"
                        src={`https://i.pravatar.cc/300?img=${props.e.id}`}
                        alt=""
                    />
                </div>
                <div className="right text-sm sm:text-base w-48 sm:w-64">
                    <strong>{props.e.name}</strong>
                    <br />
                    Spende: EUR {props.e.sum},-
                    {props.e.comment && (
                        <div className="farRight sm:hidden mt-2 text-xs border p-2 sm:p-4 bg-[lightgray]">
                            {props.e.comment}
                        </div>
                    )}
                </div>
                {props.e.comment && (
                    <div className="farRight hidden sm:block text-xs border p-2 sm:p-4 bg-[lightgray]">
                        {props.e.comment}
                    </div>
                )}
            </div>
            <hr />
        </>
    );
}

export default ListItem;
