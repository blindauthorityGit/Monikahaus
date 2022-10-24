import React from "react";

const Goal = (props) => {
    return (
        <div className={`${props.klasse}`}>
            <div className="headline font-bold text-xl mb-4">Erreichtes Ziel</div>
            <div className="balken border h-8 w-full relative">
                <div className="inner w-2/4 bg-black h-full "></div>
                <div className="wrapper relative flex">
                    <div className="now pl-48 pt-4">EUR 500,-</div>
                    <div className="then absolute pt-4 right-0">EUR 1.000,-</div>
                </div>
            </div>
        </div>
    );
};

export default Goal;
