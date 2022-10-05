import React, { useState, useEffect, useRef } from "react";
import { Kugel, Row } from "../kugeln";
import { testData } from "../../dev";
import uuid from "react-uuid";

const Raster = (props) => {
    const rowCount = Array(10).fill("");

    const [kugelWidth, setKugelWidth] = useState(5);
    const kugelRef = useRef();
    const allRef = useRef();

    useEffect(() => {
        setKugelWidth(kugelRef.current.clientHeight);
        let arr = Array.from(allRef.current.querySelectorAll(".kugel"));
        // GIVE ID's
        arr.map((e, i) => {
            e.id = i;
        });
        // ONLY IDS ARRAY
        let arrClaimedID = testData.map((e) => e.id);
        arrClaimedID.map((e, i) => {
            arr[e].style.opacity = 1;
            arr[e].style.background = testData[i].color;
            arr[e].initialOpacity = 0;
            console.log(arr[e], arr[e].style.opacity);
        });
    }, [kugelRef.current]);

    useEffect(() => {}, [allRef.current]);

    return (
        <div ref={allRef} className="flex items-center h-full">
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
                                        size="w-[5%] h-[100%] opacity-0"
                                        color="bg-white"
                                        id={i}
                                        isClaimed={false}
                                        style={{ width: kugelWidth }}
                                        // initialOpacity={0}
                                        key={uuid()}
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
