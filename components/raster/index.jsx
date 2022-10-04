import React, { useState, useEffect, useRef } from "react";
import { Kugel, Row } from "../kugeln";

const Raster = (props) => {
    const rowCount = Array(10).fill("");

    const [kugelWidth, setKugelWidth] = useState(5);
    const kugelRef = useRef();

    useEffect(() => {
        console.log(rowCount);
        console.log(kugelRef.current.clientHeight);
        setKugelWidth(kugelRef.current.clientHeight);
        // setTimeout(() => {
        //     setKugelWidth(kugelRef.current.clientHeight);
        // }, 200);
    }, [kugelRef.current]);

    return (
        <div className="flex items-center h-full">
            <div
                id="raster"
                className=" z-40"
                style={{ width: props.width, height: props.height, opacity: props.opacity }}
            >
                {rowCount.map((e, i) => {
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
                                return (
                                    <Kugel
                                        ref={kugelRef}
                                        size="w-[5%] h-[100%]"
                                        color="bg-white"
                                        id={i}
                                        isClaimed={false}
                                        style={{ width: kugelWidth }}
                                    ></Kugel>
                                );
                            })}
                        </Row>
                    );
                })}
            </div>
        </div>
    );
};

export default Raster;
