import React, { useState, useEffect, useRef, useContext } from "react";
import { Kugel, Row } from "../kugeln";
import { testData } from "../../dev";
import uuid from "react-uuid";

import { TreeAnimationFinish } from "../../helper/context";
import getIndex from "../../functions/getIndex";
import { anzahlRows } from "../../config";

const Raster = (props) => {
    const rowCount = Array(anzahlRows).fill("");

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

    function switcher(params) {
        switch (params) {
            case "#fff":
                return "bgWeiss";
            case "#DCDFDC":
                return "bgLightGreen";
            case "#000000":
                return "bgBlack";
            case "#EB4511":
                return "bgRed";
            default:
                return "bubu";
        }
    }

    useEffect(() => {
        setKugelWidth(kugelRef.current.clientHeight);
    }, [kugelRef.current]);

    useEffect(() => {
        let arr = Array.from(allRef.current.querySelectorAll(".kugel"));
        let arrClaimedID = testData.map((e) => e.id);

        arrClaimedID.map((e, i) => {
            let random = Math.random() * 500;
            setTimeout(() => {
                arr[e].style.opacity = 1;
                arr[e].style.background = testData[i].color;
                arr[e].initialOpacity = 0;
                arr[e].classList.add("bounce-in-fwd");
                arr[e].addEventListener("animationend", (e) => {
                    console.log(e.target);
                    e.target.classList.remove("bounce-in-fwd");
                });
                // CLASS NAME FOR ::AFTER STYLING TOOLTIP
                arr[e].children[0].classList.add(switcher(testData[i].color));
            }, random);
        });
        // arrClaimedID.map((e, i) => {
        //     setTimeout(() => {
        //         arr[e].style.background = "purple";
        //     }, 2000);
        // });
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
                        <Row klasse={`h-[${100 / anzahlRows}%] relative`} style={{ height: 100 / anzahlRows + "%" }}>
                            {kugelCount.map((e, i) => {
                                counter = counter + 1;
                                return (
                                    <Kugel
                                        ref={kugelRef}
                                        size={`w-[5%] h-[100%] opacity-0`}
                                        color="bg-white"
                                        textColor={
                                            data.some((e) => e.id === counter - 1)
                                                ? data[getIndex(data, counter - 1)].color.toLowerCase() === "#fff" ||
                                                  data[getIndex(data, counter - 1)].color.toLowerCase() === "#dcdfdc"
                                                    ? "text-black"
                                                    : "text-white"
                                                : ""
                                        }
                                        avatrSrc={"https://i.pravatar.cc/300"}
                                        // toolTipAfterColor={(e) => {
                                        //     data.some((e) => e.id === counter - 1)
                                        //         ? e.target.classList.add(
                                        //               switcher(data[getIndex(data, counter - 1)].color.toLowerCase())
                                        //           )
                                        //         : "";
                                        // }}
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
                                        comment={
                                            data.some((e) => e.id === counter - 1)
                                                ? data[getIndex(data, counter - 1)].comment
                                                : ""
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
