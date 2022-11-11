import React, { useState, useEffect, useRef, useContext } from "react";
import dynamic from "next/dynamic";

import { Row } from "../kugeln";

import { ShowUnclaimed, KugelColor, TreeAnimationFinish, UserList } from "../../helper/context";
import getIndex from "../../functions/getIndex";
import switcher from "../../functions/switcher";
import { anzahlRows } from "../../config";

import Draggable from "../dragNDrop/draggable";
import { FaCommentsDollar } from "react-icons/fa";
import { isBrowser, isMobile } from "react-device-detect";

// import { useColorStore } from "../zustand";
// const draggableMarkup = (
//     <Draggable style={{ width: kugelWidth + "px", height: "68px" }} id="draggable">
//         Drag me
//     </Draggable>
// );

const Kugel = dynamic(() => import("../kugeln/kugel"), {
    ssr: false,
});

const Raster = (props) => {
    const rowCount = Array(anzahlRows).fill("");

    const [kugelWidth, setKugelWidth] = useState(5);
    const [animator, setAnimator] = useState("");
    // const [data, setData] = useState(testData);
    const allRef = useRef();

    let counter = 0;

    const { treeAnimationFinish, setTreeAnimationFinish } = useContext(TreeAnimationFinish);
    const { baumDimensions, setBaumDimensions } = useContext(TreeAnimationFinish);
    const { isFullScreen, setIsFullScreen } = useContext(TreeAnimationFinish);
    const { showUnclaimed, setShowUnclaimed } = useContext(ShowUnclaimed);
    const { kugelColor, setKugelColor } = useContext(KugelColor);
    const { userList, setUserList } = useContext(UserList);

    // OPACITY CHECK DROPZONE WHEN DROPPED
    useEffect(() => {
        let check = false;
        if (props.parent) {
            check = true;
        }
        if (check) {
            let arr = Array.from(allRef.current.querySelectorAll(".kugel"));
            arr.map((e, i) => {
                if (i === props.parent) {
                    e.classList.add("opacity-100");
                    e.classList.add("outline", "outline-offset-2", "outline-pink-500");
                } else {
                    e.classList.remove("opacity-100");
                }
            });
        }
    }, [props.parent]);

    const draggableMarkup = (
        <Draggable
            klasse="rounded-full touch-none"
            style={{ width: kugelWidth + "px", height: kugelWidth + "px" }}
            id="draggable"
        ></Draggable>
    );

    useEffect(() => {
        if (treeAnimationFinish) {
            let arr = Array.from(allRef.current.querySelectorAll(".kugel"));
            let arrClaimedID = userList.map((e) => e.id);
            setTimeout(() => {
                setKugelWidth(Array.from(allRef.current.querySelectorAll(".kugel"))[0].clientHeight);
            }, 100);
            arrClaimedID.map((e, i) => {
                let random = Math.random() * 500;
                setTimeout(() => {
                    arr[e].style.opacity = 1;
                    arr[e].style.background = userList[i].color;
                    arr[e].initialOpacity = 0;
                    arr[e].classList.add("bounce-in-fwd");
                    arr[e].addEventListener("animationend", (e) => {
                        e.target.classList.remove("bounce-in-fwd");
                    });
                    // CLASS NAME FOR ::AFTER STYLING TOOLTIP
                    if (arr[e].children[0].classList.contains("draggable")) {
                        arr[e].children[2].classList.add(switcher(userList[i].color));
                    }
                    arr[e].children[1].classList.add(switcher(userList[i].color));
                }, random);
            });
        }
    }, [treeAnimationFinish, userList, baumDimensions]);

    return (
        <div
            ref={allRef}
            className="flex pl-2 sm:pl-0 sm:left-0 sm:pt-0 sm:items-center h-full"
            style={
                isMobile
                    ? { paddingTop: isFullScreen ? baumDimensions.top + 20 + "px" : baumDimensions.top + "px" }
                    : null
            }
        >
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
                        <Row
                            key={i + "nene"}
                            klasse={`h-[${100 / anzahlRows}%] relative ${isMobile ? "mb-[0.15rem]" : ""}`}
                            style={{ height: 100 / anzahlRows + "%" }}
                        >
                            {kugelCount.map((e, i) => {
                                counter = counter + 1;

                                let claimed = userList.some((e) => e.id === counter - 1);
                                return (
                                    <Kugel
                                        key={i + "kugel"}
                                        size={`w-[5%] h-[100%] ${
                                            showUnclaimed ? "opacity-30 scale-in-center" : "opacity-0"
                                        } ${
                                            claimed ? "shadow-md" : "border-2 sm:border-4 border-white border-dotted"
                                        } `}
                                        onAnimationEnd={(e) => {
                                            e.target.classList.remove("scale-in-center");
                                        }}
                                        textColor={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                      "#fff" ||
                                                  userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                      "#dcdfdc"
                                                    ? "text-black"
                                                    : "text-white"
                                                : ""
                                        }
                                        avatrSrc={`https://i.pravatar.cc/300?img=${counter - 1}`}
                                        id={counter - 1}
                                        isClaimed={userList.some((e) => e.id === counter - 1) ? "true" : "false"}
                                        disabled={userList.some((e) => e.id === counter - 1) ? true : false}
                                        style={{ width: kugelWidth }}
                                        animate={animator}
                                        onMouseEnter={(e) => {
                                            if (e.currentTarget.children[0].classList.contains("draggable")) {
                                                e.currentTarget.children[1].style.transform = "scale(0.8)";
                                                e.currentTarget.children[1].classList.remove("hidden");
                                                e.currentTarget.children[1].classList.add("scale-in-hor-right");
                                            }
                                            if (e.target.classList.contains("claimedKugel")) {
                                                // e.target.classList.add("pulsate-bck");
                                                isMobile && (e.target.style.border = "3px solid white");
                                                e.target.children[1].style.transform = "scale(0.8)";
                                                e.target.children[1].classList.remove("hidden");
                                                e.target.children[1].classList.add(
                                                    isMobile ? "scale-in-top" : "scale-in-hor-right"
                                                );
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (e.currentTarget.children[0].classList.contains("draggable")) {
                                                e.currentTarget.children[1].classList.remove("block");
                                                e.currentTarget.children[1].classList.add("hidden");
                                            }
                                            if (e.target.classList.contains("claimedKugel")) {
                                                isMobile && (e.target.style.border = "");

                                                // e.target.classList.remove("pulsate-bck");
                                                e.target.children[1].classList.remove("block");
                                                e.target.children[1].classList.add("hidden");
                                            }
                                        }}
                                        toolTiponMouseLeave={(e) => {
                                            e.target.classList.remove("block");
                                            e.target.classList.add("hidden");
                                        }}
                                        klasse={userList.some((e) => e.id === counter - 1) ? "claimedKugel" : null}
                                        toolTipStyle={{
                                            right: !isMobile ? kugelWidth + 16 + "px" : "",
                                            top: isMobile ? kugelWidth + 16 + "px" : 0,
                                            background: userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].color.toLowerCase()
                                                : "",
                                        }}
                                        toolTipColor={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                      "#fff" ||
                                                  userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                      "#dcdfdc"
                                                    ? "text-black"
                                                    : "text-white"
                                                : ""
                                        }
                                        name={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].name
                                                      .split(" ")
                                                      .map((n) => n[0])
                                                      .join(".")
                                                : ""
                                        }
                                        abstand={kugelWidth}
                                        // check ob Index in dem Kunden Array vorhanden ist
                                        fullName={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].name
                                                : "KEIN NAME"
                                        }
                                        toolTipBG={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].color.toLowerCase()
                                                : ""
                                        }
                                        sum={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].sum
                                                : "KEIN NAME"
                                        }
                                        comment={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].comment
                                                : ""
                                        }
                                        winner={counter - 1 == 40 ? true : false}
                                    >
                                        {props.parent === counter - 1 ? (
                                            <Draggable
                                                klasse={`draggable touch-none rounded-full flex items-center justify-center ${
                                                    kugelColor.color == "rgb(255, 255, 255)" ||
                                                    kugelColor.color == "rgb(220, 223, 220)"
                                                        ? "text-black border-4"
                                                        : "text-white"
                                                }`}
                                                style={{
                                                    width: kugelWidth + "px",
                                                    height: kugelWidth + "px",
                                                    background: kugelColor.color,
                                                }}
                                                id="draggable"
                                            >
                                                {kugelColor.anon
                                                    ? "Anon"
                                                    : kugelColor.name
                                                          .split(" ")
                                                          .map((n) => n[0])
                                                          .join(".")}
                                            </Draggable>
                                        ) : (
                                            ""
                                        )}
                                    </Kugel>
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
