import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./droppable";
import Draggable from "./draggable";

const DNDTest = () => {
    const containers = ["A", "B", "C"];
    const [parent, setParent] = useState(null);
    const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

    function handleDragEnd(event) {
        const { over } = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}
            <div className="grid grid-cols-12 ">
                {containers.map((id) => (
                    // We updated the Droppable component so it would accept an `id`
                    // prop and pass it to `useDroppable`

                    <Droppable key={id} id={id}>
                        {parent === id ? draggableMarkup : "Drop here"}
                    </Droppable>
                ))}{" "}
            </div>
        </DndContext>
    );
};

export default DNDTest;
