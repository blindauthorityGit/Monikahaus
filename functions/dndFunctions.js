function droppedZone(id, state) {
    const elem = document.getElementById(id);
    if (state) {
        elem.classList.remove("opacity-30");
        elem.classList.add("opacity-100");
    }
}
function draggedZone(id) {
    document.getElementById(id).style.opacity = 1;
}

function handleDragStart(event, setActiveId, setIsDragging, setIsDropped) {
    setActiveId(event.active.id);
    setIsDragging(true);
    setIsDropped(false);
    // console.log(event);
}

function handleDragEnd(event, setParent, setActiveId, setIsDropped, setIsDragging, droppedZone) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
    setActiveId(null);
    setIsDropped(over ? true : false);
    setIsDragging(false);
    droppedZone(over.id);
    console.log(document.getElementById(over.id).parentElement);
    console.log(event);
    // console.log(event);
    console.log(over ? over.id : null);
    // if (over.id < 14) {
    //     document.getElementById("Pfad_313").classList.add("bounce-right");
    // }
}

export { droppedZone, draggedZone, handleDragStart, handleDragEnd };
