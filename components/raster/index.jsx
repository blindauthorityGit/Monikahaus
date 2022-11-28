import React, { useState, useEffect, useRef, useContext } from "react";
import dynamic from "next/dynamic";

import { Row } from "../kugeln";

import { ShowUnclaimed, KugelColor, TreeAnimationFinish, UserList } from "../../helper/context";
import getIndex from "../../functions/getIndex";
import { switcher, switcherRGB } from "../../functions/switcher";
import { anzahlRows, dev, anzahlBaumKugeln, bgColors } from "../../config";

import Draggable from "../dragNDrop/draggable";
import { isMobile } from "react-device-detect";

import { useWindowSize, useWindowWidth, useWindowHeight } from "@react-hook/window-size";

import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Kugel = dynamic(() => import("../kugeln/kugel"), {
    ssr: false,
});

const Raster = (props) => {
    const rowCount = Array(anzahlRows).fill("");

    const [kugelWidth, setKugelWidth] = useState(5);
    const [animator, setAnimator] = useState("");
    const [data, setData] = useState(props.data);
    const allRef = useRef();

    const [masterCounter, setMasterCounter] = useState(0);
    let counter = masterCounter;
    // MULTI TREES

    const [ballsPerTree, setBallsPerTree] = useState(anzahlBaumKugeln);
    const [treeAnzahl, setTreeAnzahl] = useState(0);
    const [currentTree, setCurrentTree] = useState(0);

    const { treeAnimationFinish, setTreeAnimationFinish } = useContext(TreeAnimationFinish);
    const { baumDimensions, setBaumDimensions } = useContext(TreeAnimationFinish);
    // const { imageList, setImageList } = useContext(TreeAnimationFinish);
    const { showUnclaimed, setShowUnclaimed } = useContext(ShowUnclaimed);
    const { kugelColor, setKugelColor } = useContext(KugelColor);
    const { userList, setUserList } = useContext(UserList);

    // HEIGHT UND WIDTH CHECKER FÜR MOBILE

    const [width, height] = useWindowSize();
    const onlyWidth = useWindowWidth();
    const onlyHeight = useWindowHeight();

    const [realWidth, setRealWidth] = useState(0);

    // FLAG FOR TREE CHANGE / ANIMATIONEND
    const [freeTree, setFreeTree] = useState(true);

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

    useEffect(() => {
        // SET TREE NUMBER
        setTreeAnzahl(Math.ceil((userList.length + 1) / ballsPerTree));
        setCurrentTree(Math.ceil((userList.length + 1) / ballsPerTree) - 1);
        setRealWidth(onlyWidth);

        function handleResize() {
            // Set window width/height to state
            setRealWidth(onlyWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        console.log("Counter: ", ballsPerTree * (treeAnzahl - 1));
        console.log("currentTree: ", currentTree);
        setMasterCounter(ballsPerTree * currentTree);
    }, [ballsPerTree, treeAnzahl, currentTree]);

    const draggableMarkup = (
        <Draggable
            klasse="rounded-full touch-none"
            style={{ width: kugelWidth + "px", height: kugelWidth + "px" }}
            id="draggable"
        ></Draggable>
    );

    useEffect(() => {
        // SET TREE NUMBER

        if (treeAnimationFinish) {
            let arr = Array.from(allRef.current.querySelectorAll(".kugel"));
            arr.map((e) => {
                let treeMuliplicator = currentTree * ballsPerTree;

                if (arr[e - treeMuliplicator] !== undefined) {
                    arr[e - treeMuliplicator].classList.remove("opacity-100");
                    arr[e - treeMuliplicator].classList.add("opacity-0");
                    arr[e - treeMuliplicator] = "transparent";
                }
            });
            let arrClaimedID = userList.map((e) => e.id);
            setTimeout(() => {
                setKugelWidth(Array.from(allRef.current.querySelectorAll(".kugel"))[6].clientHeight);
            }, 300);
            arrClaimedID.map((e, i) => {
                let random = Math.random() * 500;
                let treeMuliplicator = currentTree * ballsPerTree;
                setTimeout(() => {
                    if (arr[e - treeMuliplicator] !== undefined) {
                        arr[e - treeMuliplicator].classList.remove("opacity-0");
                        arr[e - treeMuliplicator].classList.add("opacity-100");
                        arr[e - treeMuliplicator].style.background = userList[i].color;
                        arr[e - treeMuliplicator].initialOpacity = 0;
                        arr[e - treeMuliplicator].classList.add("bounce-in-fwd");
                        arr[e - treeMuliplicator].addEventListener("animationend", (e) => {
                            e.target.classList.remove("bounce-in-fwd");
                        });
                        // CLASS NAME FOR ::AFTER STYLING TOOLTIP
                        if (arr[e - treeMuliplicator].children[0].classList.contains("draggable")) {
                            arr[e - treeMuliplicator].children[2].classList.add(switcherRGB(userList[i].color));
                        } else {
                            setTimeout(() => {
                                arr[e - treeMuliplicator].children[1].classList.remove(
                                    "bgWeiss",
                                    "bgLightGreen",
                                    "bgBlack",
                                    "bgRed"
                                );
                                arr[e - treeMuliplicator].children[1].classList.add(switcherRGB(userList[i].color));
                            }, 800);
                        }
                    }
                }, random);
            });
        }
    }, [treeAnimationFinish, userList, baumDimensions, currentTree, ballsPerTree, masterCounter, counter]);

    useEffect(() => {
        if (treeAnzahl > 1) {
            console.log("MORE TREEES");
        }
    }, [treeAnzahl]);

    function treeBG() {
        // CHECK IF TREE IS FULL OR NOT
        setTimeout(() => {
            let len = Array.from(document.querySelectorAll(".claimedKugel")).length;
            if (len < ballsPerTree) {
                document.body.style.background = "white";
            } else {
                document.body.style.background = bgColors[currentTree];
                console.log(currentTree, bgColors[currentTree]);
            }

            console.log(Array.from(document.querySelectorAll(".claimedKugel")).length, ballsPerTree);
        }, 600);
    }

    function treeChanger(pos) {
        if (freeTree) {
            if (pos == "true") {
                if (currentTree < treeAnzahl - 1) {
                    setCurrentTree(currentTree + 1);
                    setMasterCounter(masterCounter + -ballsPerTree);
                    treeBG();
                }
            } else {
                if (currentTree != 0) {
                    setCurrentTree(currentTree - 1);

                    setMasterCounter(masterCounter - ballsPerTree);
                    treeBG();
                }
            }
        } else {
            console.log("BLOOOCKED");
        }
        setFreeTree(false);
        setTimeout(() => {
            setFreeTree(true);
        }, 800);

        console.log("Tree change", currentTree);
    }

    return (
        <>
            {treeAnimationFinish && treeAnzahl > 1 && (
                <>
                    <div
                        className={`absolute text-4xl md:text-6xl top-[35%] left-6 z-50 ${
                            currentTree == 0 ? "opacity-20" : ""
                        }`}
                        onClick={() => {
                            treeChanger("false");
                        }}
                    >
                        <FaChevronCircleLeft></FaChevronCircleLeft>
                    </div>
                    <div
                        className={`absolute  text-4xl md:text-6xl  z-50 top-[35%] right-6 ${
                            currentTree == treeAnzahl - 1 ? "opacity-20" : ""
                        }`}
                        onClick={() => {
                            treeChanger("true");
                        }}
                    >
                        <FaChevronCircleRight></FaChevronCircleRight>
                    </div>
                </>
            )}
            <div
                ref={allRef}
                className="flex pl-2 lg:pl-0 lg:left-0 pt-8 lg:pt-0 relative h-full"
                style={
                    realWidth <= 500
                        ? { paddingTop: baumDimensions.top + "px" }
                        : {
                              paddingTop:
                                  baumDimensions.top +
                                  document.querySelector("#Pfad_231").getBoundingClientRect().height -
                                  22 +
                                  "px",
                              paddingLeft: isMobile ? "10px" : "",
                              marginLeft: !isMobile ? "-10px" : "",
                          }
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
                                    // setCounter((prev) => {
                                    //     prev + 1;
                                    // });

                                    let claimed = userList.some((e) => e.id === counter - 1);
                                    return (
                                        <Kugel
                                            key={i + "kugel"}
                                            size={`w-[5%] h-[100%] ${
                                                showUnclaimed
                                                    ? "opacity-30 scale-in-center bg-transparent"
                                                    : claimed
                                                    ? ""
                                                    : "opacity-0"
                                            } ${
                                                claimed
                                                    ? "shadow-md"
                                                    : "border-2 sm:border-4 border-white border-dotted"
                                            } `}
                                            onAnimationEnd={(e) => {
                                                // e.target.classList.remove("scale-in-center");
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
                                            isAnon={
                                                userList.some((e) => e.id === counter - 1) &&
                                                userList[getIndex(userList, counter - 1)].anon
                                            }
                                            avatrSrc={
                                                userList.some((e) => e.id === counter - 1)
                                                    ? userList[getIndex(userList, counter - 1)].image
                                                    : null
                                            }
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
                                                          "rgb(255, 255, 255)" ||
                                                      userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                          "rgb(220, 223, 220)" ||
                                                      !userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                          "rgb(235, 69, 17)"
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
                                                    ? userList[getIndex(userList, counter - 1)].anon
                                                        ? "Anonyme Spende"
                                                        : userList[getIndex(userList, counter - 1)].name
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
                                                    klasse={`draggable touch-none rounded-full indent-[9999px] sm:indent-0 flex items-center justify-center ${
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
                {treeAnimationFinish && treeAnzahl > 1 && (
                    <div
                        className="absolute bottom-0 z-30 w-full text-center h-24 font-bold"
                        style={{ top: baumDimensions.bottom + 20 + "px" }}
                    >
                        Aktueller Baum: {currentTree + 1}
                    </div>
                )}
            </div>
        </>
    );
};

export default Raster;
