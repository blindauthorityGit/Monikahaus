import React, { useEffect } from "react";
import { Kugel, Row } from "../kugeln";

const Raster = (props) => {
    const rowCount = Array(10).fill("");

    useEffect(() => {
        console.log(rowCount);
    }, []);

    return (
        <div className="flex items-center h-full">
            <div
                id="raster"
                className=" z-40"
                style={{ width: props.width, height: props.height, opacity: props.opacity }}
            >
                {rowCount.map((e, i) => {
                    console.log(i);
                    let kugelCount = [];
                    if (i > 4 && i < 8) {
                        kugelCount = Array(i + -1).fill("");
                    } else if (i >= 8) {
                        kugelCount = Array(i - 3).fill("");
                    } else {
                        kugelCount = Array(i + 1).fill("");
                    }
                    return (
                        <Row klasse="h-[10%] relative">
                            {kugelCount.map((e, i) => {
                                return <Kugel size="w-[5%] h-[100%]" color="bg-white" id={i} isClaimed={false}></Kugel>;
                            })}
                        </Row>
                    );
                })}
            </div>
        </div>
    );
};

export default Raster;
