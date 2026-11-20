import React from "react";

const MainButton = ({ bgColor, hoverClass, children, onClick, klasse, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-12 ${
                disabled ? "opacity-30" : "opacity-100"
            } py-4 w-full lg:w-auto rounded-md font-semibold text-sm lg:text-base xl:text-lg uppercase tracking-widest ${klasse} bg-${bgColor} hover:${hoverClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor focus-visible:ring-offset-2 `}
        >
            {children}
        </button>
    );
};

export default MainButton;
