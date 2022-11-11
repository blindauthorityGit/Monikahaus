import React from "react";
import SpendenSumme from "./spendenSumme";

const MobileSecond = (props) => {
    return <SpendenSumme dataTip="Ihre Spende in EURO" onChange={props.onChange}></SpendenSumme>;
};

export default MobileSecond;
