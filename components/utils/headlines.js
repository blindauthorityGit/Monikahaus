import React from "react";

function H1(props) {
    return (
        <h1
            className={`z-20 text-3xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-rucksack text-uppercase font-bold ${props.klasse}`}
        >
            {props.children}
        </h1>
    );
}
function H2(props) {
    return (
        <h2
            className={`z-20 text-4xl lg-text-5xl xl:text-6xl 2xl:text-5xl 3xl:text-7xl font-rucksack  ${props.klasse}`}
        >
            {props.children}
        </h2>
    );
}
function H2Variant(props) {
    return (
        <h2
            className={`z-20 text-4xl lg-text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-rucksack  ${props.klasse}`}
        >
            {props.children}
        </h2>
    );
}
function H2VariantOneLine(props) {
    return (
        <h2 className={`z-20 text-3xl lg-text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl font-roboto ${props.klasse}`}>
            <span className="font-extralight block">{props.top}</span>
            <span className="font-regular"> {props.bottom}</span>
            {props.children}
        </h2>
    );
}
function H3(props) {
    return (
        <h3
            className={`z-20 text-xl lg-text-xl xl:text-2xl 2xl:text-3xl 3xl:text-3xl font-bold font-rucksack  ${props.klasse}`}
        >
            {props.children}
        </h3>
    );
}
function H4(props) {
    return (
        <h4
            className={`z-20 text-lg lg-text-xl xl:text-xl 2xl:text-xl 3xl:text-2xl font-semibold font-rucksack  mb-4 ${props.klasse}`}
        >
            {props.children}
        </h4>
    );
}

export { H1, H2, H2Variant, H2VariantOneLine, H3, H4 };
