import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Burger = (props) => {
    return (
        <div className="absolute right-6 top-6 sm:hidden">
            <GiHamburgerMenu onClick={props.onClick}></GiHamburgerMenu>
        </div>
    );
};

export default Burger;
