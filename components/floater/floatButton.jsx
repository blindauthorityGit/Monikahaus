import React from "react";

const FloatButton = ({ children, klasse, onClick, label }) => {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className={`${klasse} w-10 h-10 xl:w-20 xl:h-20 xl:text-3xl bg-primaryColor hover:bg-primaryColor-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primaryColor transition-colors ease-in-out cursor-pointer rounded-l-xl text-white`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default FloatButton;
