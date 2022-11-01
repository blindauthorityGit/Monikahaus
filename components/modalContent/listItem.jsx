import React from "react";

function ListItem(props) {
    return (
        <>
            <div
                data-id={props.e.id}
                className="wrapper flex items-center mb-4 hover:bg-[#f5f5f5]"
                onMouseOver={(e) => {
                    props.onHover(e);
                }}
                onMouseLeave={(e) => {
                    props.onLeave(e);
                }}
            >
                <div className="left pr-6">
                    <img className="rounded-full h-24" src={`https://i.pravatar.cc/300?img=${props.e.id}`} alt="" />
                </div>
                <div className="right w-64">
                    <strong>{props.e.name}</strong>
                    <br />
                    Spende: EUR {props.e.sum},-
                </div>
                {props.e.comment && <div className="farRight border p-4 bg-[lightgray]">{props.e.comment}</div>}
                <hr />
            </div>
            <hr />
        </>
    );
}

export default ListItem;
