import React, { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";

import { Draggable } from "./Draggable";

/* The implementation details of <Item> and <ScrollableList> are not
 * relevant for this example and are therefore omitted. */

function OverlayTest() {
    const [items] = useState(["1", "2", "3", "4", "5"]);
    const [activeId, setActiveId] = useState(null);

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {items.map((id) => (
                <Draggable key={id} id={id}>
                    <div value={`Item ${id}`} />
                </Draggable>
            ))}

            <DragOverlay>{activeId ? <div value={`Item ${activeId}`} /> : null}</DragOverlay>
        </DndContext>
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd() {
        setActiveId(null);
    }
}

export default OverlayTest;
