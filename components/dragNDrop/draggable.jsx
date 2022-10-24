import { useDraggable } from "@dnd-kit/core";
import Item from "./item";

function Draggable(props) {
    const Element = props.element || "div";
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <Item ref={setNodeRef} {...listeners} {...attributes} klasse={props.klasse} style={props.style}>
            {props.children}
        </Item>
    );
}

export default Draggable;
