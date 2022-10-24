import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./droppable";
import Draggable from "./draggable";

const DNDTest = () => {
    const containers = ["A", "B", "C"];
    const [parent, setParent] = useState(null);
    const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;
    const [isDragging, setIsDragging] = useState(false);

    // function handleDragEnd(event) {
    //     const { over } = event;
    //     setParent(over ? over.id : null);
    //     console.log(event.over);
    // }

    function handleDragStart() {
        setIsDragging(true);
    }

    function handleDragEnd() {
        setIsDragging(false);
    }

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}
            <div className="grid grid-cols-12 ">
                {containers.map((id) => (
                    // We updated the Droppable component so it would accept an `id`
                    // prop and pass it to `useDroppable`

                    <Droppable key={id} id={id}>
                        {parent === id ? draggableMarkup : "Drop here ggeg"}
                    </Droppable>
                ))}{" "}
            </div>
        </DndContext>
        // <DndContext onDragEnd={handleDragEnd}>
        //     {parent === null ? draggableMarkup : null}
        //     <div className="grid grid-cols-12 ">
        //         {containers.map((id) => (
        //             // We updated the Droppable component so it would accept an `id`
        //             // prop and pass it to `useDroppable`

        //             <Droppable key={id} id={id}>
        //                 {parent === id ? draggableMarkup : "Drop here ggeg"}
        //             </Droppable>
        //         ))}{" "}
        //     </div>
        // </DndContext>
    );
};

export default DNDTest;
