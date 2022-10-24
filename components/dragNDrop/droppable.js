import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        color: isOver ? "green" : undefined,
    };

    return (
        <div id={props.id} className="w-96 h-9 col-span-4 bg-blue-500" ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}
