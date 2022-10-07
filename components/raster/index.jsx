import React, { useState, useEffect, useRef, useContext } from "react";
import { Kugel, Row } from "../kugeln";
import { testData } from "../../dev";
import uuid from "react-uuid";

import { TreeAnimationFinish } from "../../helper/context";
import getIndex from "../../functions/getIndex";

const Raster = (props) => {
    const rowCount = Array(10).fill("");

    const [kugelWidth, setKugelWidth] = useState(5);
    const [animator, setAnimator] = useState("");
    const [name, setName] = useState({ name: "name" });
    const [data, setData] = useState(testData);
    const [iDCounter, setIDCounter] = useState(0);
    const kugelRef = useRef();
    const allRef = useRef();

    let counter = 0;

    function someData(data, attr, noData) {
        return data.some((e) => e.id === counter - 1) ? data[getIndex(data, counter - 1)].attr : noData;
    }

    const { treeAnimationFinish, setTreeAnimationFinish } = useContext(TreeAnimationFinish);

    useEffect(() => {
        setKugelWidth(kugelRef.current.clientHeight);
        let arr = Array.from(allRef.current.querySelectorAll(".kugel"));
        // GIVE ID's
        // arr.map((e, i) => {
        //     e.id = i;
        // });
        // ONLY IDS ARRAY
        let arrClaimedID = testData.map((e) => e.id);
        arrClaimedID.map((e, i) => {
            // setName((prev) => ({ ...prev, name: testData[i].name }));
            // arr[e].style.opacity = 1;
            // arr[e].style.background = testData[i].color;
            // arr[e].initialOpacity = 0;
            // arr[e].classList.add("animate__animated animate__bounce");
            // setAnimator({ scale: 2 });
        });
        console.log(getIndex(data, 2));
    }, [kugelRef.current]);

    useEffect(() => {
        let arr = Array.from(allRef.current.querySelectorAll(".kugel"));
        let arrClaimedID = testData.map((e) => e.id);
        if (treeAnimationFinish) {
            arrClaimedID.map((e, i) => {
                let random = Math.random() * 500;
                setTimeout(() => {
                    arr[e].style.opacity = 1;
                    arr[e].style.background = testData[i].color;
                    arr[e].initialOpacity = 0;
                    arr[e].classList.add("bounce-in-fwd");
                }, random);
            });
        }
    }, [treeAnimationFinish]);

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
                                counter = counter + 1;
                                console.log(kugelWidth);
                                return (
                                    <Kugel
                                        ref={kugelRef}
                                        size={`w-[5%] h-[100%] opacity-0`}
                                        color="bg-white"
                                        id={counter - 1}
                                        isClaimed={false}
                                        style={{ width: kugelWidth }}
                                        animate={animator}
                                        key={uuid()}
                                        onMouseEnter={(e) => {
                                            if (e.target.classList.contains("claimedKugel")) {
                                                e.target.children[0].classList.remove("hidden");
                                                e.target.children[0].classList.add("scale-in-hor-right");
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (e.target.classList.contains("claimedKugel")) {
                                                e.target.children[0].classList.remove("block");
                                                e.target.children[0].classList.add("hidden");
                                            }
                                        }}
                                        toolTiponMouseLeave={(e) => {
                                            e.target.classList.remove("block");
                                            e.target.classList.add("hidden");
                                        }}
                                        klasse={data.some((e) => e.id === counter - 1) ? "claimedKugel" : null}
                                        toolTipStyle={{
                                            right: kugelWidth + 16 + "px",
                                            background: data.some((e) => e.id === counter - 1)
                                                ? data[getIndex(data, counter - 1)].color.toLowerCase()
                                                : "",
                                        }}
                                        toolTipColor={
                                            data.some((e) => e.id === counter - 1)
                                                ? data[getIndex(data, counter - 1)].color.toLowerCase() === "#fff" ||
                                                  data[getIndex(data, counter - 1)].color.toLowerCase() === "#dcdfdc"
                                                    ? "text-black"
                                                    : "text-white"
                                                : ""
                                        }
                                        name={
                                            data.some((e) => e.id === counter - 1)
                                                ? data[getIndex(data, counter - 1)].name
                                                      .split(" ")
                                                      .map((n) => n[0])
                                                      .join(".")
                                                : ""
                                        }
                                        abstand={kugelWidth}
                                        // check ob Index in dem Kunden Array vorhanden ist
                                        fullName={
                                            data.some((e) => e.id === counter - 1)
                                                ? data[getIndex(data, counter - 1)].name
                                                : "KEIN NAME"
                                        }
                                        toolTipBG={
                                            data.some((e) => e.id === counter - 1)
                                                ? data[getIndex(data, counter - 1)].color.toLowerCase()
                                                : ""
                                        }
                                        sum={
                                            data.some((e) => e.id === counter - 1)
                                                ? data[getIndex(data, counter - 1)].sum
                                                : "KEIN NAME"
                                        }
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
