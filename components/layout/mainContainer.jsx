import { forwardRef } from "react";

const MainContainer = (props, ref) => {
    return (
        <div
            ref={ref}
            id={props.id}
            className={`grid grid-cols-12 ${props.noGap ? "" : "gap-8"} m-auto ${props.width}`}
        >
            {props.children}
        </div>
    );
};

export default forwardRef(MainContainer);
