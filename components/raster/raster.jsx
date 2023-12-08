import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

//COMPS
import Row from "./row";
const Kugel = dynamic(() => import("./kugel"), {
    ssr: false,
});
import { TreeCountFloater } from "../floater";

// CONFIG
import { anzahlRows, dev, anzahlBaumKugeln, bgColors } from "../../config";

//STORE
import useStore from "../../store/store"; // Import the zustand store

//HOOKS | FUNCTIONS
import { isMobile } from "react-device-detect";
import getIndex from "../../functions/getIndex";

//DND STUFF
import Draggable from "../dragNDrop/draggable";

// SWIPER STUFF
import { useSwipeable } from "react-swipeable";

// ICONS
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

//FUNTIONS
import isElementOverflowing from "../../functions/isElementOverflowing";

const Raster = (props) => {
    //GLOBAL USER DATA STATE
    const userData = useStore((state) => state.userData);

    //CONTAINER REF
    const allRef = useRef();

    // MULTI TREES
    const [ballsPerTree, setBallsPerTree] = useState(anzahlBaumKugeln);
    const [treeAnzahl, setTreeAnzahl] = useState(0);
    const [currentTree, setCurrentTree] = useState(0);

    // FLAG FOR TREE CHANGE / ANIMATIONEND
    const [freeTree, setFreeTree] = useState(true);

    const [masterCounter, setMasterCounter] = useState(0);
    let counter = masterCounter;

    //GLOBAL UNCLAIMED STATE
    const showUnclaimed = useStore((state) => state.showUnclaimed);
    const setShowUnclaimed = useStore((state) => state.setShowUnclaimed);

    //GLOBAL USERLIST STATE
    const userList = useStore((state) => state.userList);

    // SET ROW COUNT
    const rowCount = Array(anzahlRows).fill("");

    // WIDTH OF BALLS
    const [kugelWidth, setKugelWidth] = useState(50);

    //GLOBAL ANIMATION TREE STATE
    const animateTree = useStore((state) => state.animateTree);
    const setAnimateTree = useStore((state) => state.setAnimateTree);
    const swipeCount = useStore((state) => state.swipeCount);
    const setSwipeCount = useStore((state) => state.setSwipeCount);

    //ANIMATION END TREE
    const animationEndCounter = useStore((state) => state.animationEndCounter);

    //TOOLTIP OPEN FLAG FOR ZINDEX OF GRAPHICS
    const setTooltipOpen = useStore((state) => state.setTooltipOpen);

    //HOP TO THE LAST TREE
    const getToLastTree = useStore((state) => state.getToLastTree);
    const setGetToLastTree = useStore((state) => state.setGetToLastTree);

    //INITIAL FLAG
    const [initialLoad, setInitialLoad] = useState(true);

    const { ref: documentRef } = useSwipeable({
        onSwipedLeft: (e) => {
            if (currentTree !== treeAnzahl - 1) {
                treeChanger("true");
                setAnimateTree("left");
                setSwipeCount((prev) => prev + 1);
                setInitialLoad(false);
            }
        },
        onSwipedRight: (e) => {
            if (currentTree > 0) {
                treeChanger("false");
                setAnimateTree("right");
                setSwipeCount((prev) => prev + 1);
                setInitialLoad(false);
            }
        },

        preventDefaultTouchmoveEvent: true,
    });

    useEffect(() => {
        documentRef(document);
    });

    useEffect(() => {
        setMasterCounter(ballsPerTree * currentTree);
    }, [ballsPerTree, treeAnzahl, currentTree]);

    useEffect(() => {
        // SET TREE NUMBER
        console.log("TEST");
        setTreeAnzahl(Math.ceil((userList.length + 1) / ballsPerTree));
        setCurrentTree(Math.ceil((userList.length + 1) / ballsPerTree) - 1);
        console.log("TREE ANZAHL:", Math.ceil((userList.length + 1) / ballsPerTree));
    }, [ballsPerTree, userList.length]);

    //WHEN CLICK ON START WITH MULTIPLE TREES HOP TO LAST TREE IF ANY OTHER IS CURRENT
    const slideToLastTree = () => {
        if (currentTree !== treeAnzahl - 1) {
            treeChanger("true");
            setAnimateTree("left");
            setSwipeCount((prev) => prev + 1);
            setCurrentTree(treeAnzahl - 1); // Set currentTree to the last tree
            setInitialLoad(false);
        }
    };
    useEffect(() => {
        if (getToLastTree) {
            slideToLastTree();
            // Reset the getToLastTree flag after sliding
            setGetToLastTree(false);
        }
    }, [getToLastTree]);

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
                    e.classList.remove("opacity-50");
                    e.classList.add("opacity-100");
                    e.classList.add("outline", "outline-offset-2", "outline-white");
                } else {
                    e.classList.remove("opacity-100");
                }
            });
        }
    }, [props.parent]);

    //TREE CHANGER FUNCTION
    function treeChanger(pos) {
        if (freeTree) {
            if (pos == "true") {
                if (currentTree < treeAnzahl - 1) {
                    setCurrentTree(currentTree + 1);
                    setMasterCounter(masterCounter + -ballsPerTree);
                    // treeBG();
                }
            } else {
                if (currentTree != 0) {
                    setCurrentTree(currentTree - 1);
                    setMasterCounter(masterCounter - ballsPerTree);
                    // treeBG();
                }
            }
        } else {
        }
        setFreeTree(false);
        setTimeout(() => {
            setFreeTree(true);
        }, 500);

        console.log("Tree change", currentTree);
    }

    useEffect(() => {
        document.body.classList.remove("overflow-hidden");
        let arr = Array.from(allRef.current.querySelectorAll(".kugel"));

        let arrClaimedID = userList.map((e) => e.id);
        setTimeout(() => {
            setKugelWidth(Array.from(allRef.current.querySelectorAll(".kugel"))[6].clientHeight);
        }, 300);

        arrClaimedID.map((e, i) => {
            // e.classList.add("shine");
            let random = Math.random() * 100;
            let treeMuliplicator = currentTree * ballsPerTree;

            setTimeout(() => {
                if (arr[e - treeMuliplicator] !== undefined) {
                    arr[e - treeMuliplicator].classList.remove("opacity-0");
                    arr[e - treeMuliplicator].classList.add("opacity-100", "shine");
                    arr[e - treeMuliplicator].style.background = userList[i].color;
                    arr[e - treeMuliplicator].initialOpacity = 0;
                    arr[e - treeMuliplicator].classList.add("bounce-in-fwd");
                    arr[e - treeMuliplicator].addEventListener("animationend", (e) => {
                        e.target.classList.remove("bounce-in-fwd");
                    });
                }
            }, random);
        });
    }, [animationEndCounter]);

    // HIDE BALLS FOR ANIMATION
    useEffect(() => {
        let arr = Array.from(allRef.current.querySelectorAll(".kugel"));
        console.log(initialLoad);
        initialLoad
            ? null
            : arr.map((e, i) => {
                  e.style.background = "none";
                  e.classList.remove("shine", "shadow-md");
              });
    }, [masterCounter, initialLoad]);

    return (
        <>
            {" "}
            {treeAnzahl > 1 && (
                <>
                    <TreeCountFloater klasse="absolute left-0 right-0 text-center top-[87%] w-[40%] lg:left-0 lg:right-0 lg:bottom-[-8%] m-auto ">
                        Baum {currentTree + 1} / {treeAnzahl}
                    </TreeCountFloater>
                    <div
                        className={`absolute hover:scale-90 cursor-pointer transition-all text-3xl md:text-5xl xl:text-6xl top-[48%] left-[-10%] z-40 ${
                            currentTree == 0 ? "opacity-20" : ""
                        }`}
                        onClick={() => {
                            if (currentTree > 0) {
                                document.body.classList.add("overflow-hidden");
                                treeChanger("false");
                                setAnimateTree("right");
                                setSwipeCount((prev) => prev + 1);
                                setInitialLoad(false);
                            }
                        }}
                    >
                        <FaChevronCircleLeft></FaChevronCircleLeft>
                    </div>
                    <div
                        className={`absolute hover:scale-90 cursor-pointer text-3xl md:text-5xl xl:text-6xl  z-40 top-[48%] right-[-10%] ${
                            currentTree == treeAnzahl - 1 ? "opacity-20" : ""
                        }`}
                        onClick={() => {
                            if (currentTree !== treeAnzahl - 1) {
                                document.body.classList.add("overflow-hidden");
                                treeChanger("true");
                                setAnimateTree("left");
                                setSwipeCount((prev) => prev + 1);
                                setInitialLoad(false);
                            }
                        }}
                    >
                        <FaChevronCircleRight></FaChevronCircleRight>
                    </div>
                </>
            )}
            <div className="h-full" ref={allRef}>
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
                            klasse={`h-[${100 / anzahlRows}%] relative `}
                            style={{ height: 100 / anzahlRows + "%" }}
                        >
                            {kugelCount.map((e, i) => {
                                counter = counter + 1;
                                //CHECK IF BALL IS CLAIMED OR NOT
                                let claimed = userList.some((e) => e.id === counter - 1);
                                return (
                                    <Kugel
                                        key={i + "kugel"}
                                        size={`h-[100%] ${
                                            showUnclaimed && !claimed
                                                ? "opacity-50 bg-transparent"
                                                : claimed
                                                ? "opacity-100"
                                                : "opacity-0 scale-out-center"
                                        } ${
                                            claimed
                                                ? "shadow-md shine"
                                                : `border-2 sm:border-4 border-white border-dotted ${
                                                      showUnclaimed ? "scale-in-center" : null
                                                  }`
                                        }`}
                                        onAnimationEnd={(e) => {
                                            e.target.classList.remove("scale-in-center");
                                        }}
                                        color={
                                            userList.some((e) => e.id === counter - 1)
                                                ? `bg-[${userList[getIndex(userList, counter - 1)].color}]`
                                                : null
                                        }
                                        textColor={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                      "rgb(255, 255, 255)" ||
                                                  userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                      "rgb(220, 224, 0)"
                                                    ? "text-black"
                                                    : "text-white"
                                                : ""
                                        }
                                        isAnon={
                                            userList.some((e) => e.id === counter - 1) &&
                                            userList[getIndex(userList, counter - 1)].isAnonymous
                                        }
                                        avatrSrc={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].image
                                                : null
                                        }
                                        onClickAvatar={(e) => {}}
                                        id={counter - 1}
                                        isClaimed={userList.some((e) => e.id === counter - 1) ? "true" : "false"}
                                        disabled={userList.some((e) => e.id === counter - 1) ? true : false}
                                        style={{
                                            // width: kugelWidth,
                                            background: userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].color
                                                : null,
                                            aspectRatio: "1 / 1",
                                        }}
                                        // animate={animator}
                                        onMouseEnter={(e) => {
                                            if (e.currentTarget.children[0].classList.contains("draggable")) {
                                                e.currentTarget.children[1].style.transform = "scale(0.8)";
                                                e.currentTarget.children[1].classList.remove("hidden");
                                                e.currentTarget.children[1].classList.add("scale-in-hor-right");
                                            }
                                            if (e.target.classList.contains("claimedKugel")) {
                                                e.target.children[1].style.setProperty("--custom-left", `51%`);
                                                e.target.children[1].style.setProperty("--custom-top", `10%`);
                                                setTooltipOpen(true);
                                                // Wrap the setTimeout in a Promise
                                                const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

                                                // Create a function that combines the timeout and the logic
                                                const handleTimeoutAndLogic = async () => {
                                                    // Wait for 250ms
                                                    await delay(250);

                                                    // Execute isElementOverflowing
                                                    isElementOverflowing(e.target.children[1]);

                                                    // The rest of your logic
                                                    let ballRectLeft = e.target.getBoundingClientRect().left;
                                                    let ballWidth = e.target.getBoundingClientRect().width;
                                                    let tooltipRect = e.target.children[1].getBoundingClientRect();
                                                    let ballToToolTipDistance =
                                                        ballRectLeft - tooltipRect.left + ballWidth / 2;
                                                    let beforePercentage =
                                                        (ballToToolTipDistance / tooltipRect.width) * 100;

                                                    e.target.children[1].style.setProperty(
                                                        "--custom-left",
                                                        `${beforePercentage + 1}%`
                                                    );
                                                    e.target.children[1].style.setProperty("--custom-top", `2%`);

                                                    console.log(beforePercentage);
                                                };

                                                // Call the function
                                                handleTimeoutAndLogic();
                                                e.target.style.border = "3px solid white";
                                                e.target.children[1].style.transform = "scale(0.8)";
                                                e.target.children[1].classList.remove("hidden");
                                                e.target.children[1].classList.add(
                                                    isMobile ? "scale-in-top" : "scale-in-top"
                                                );
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (e.currentTarget.children[0].classList.contains("draggable")) {
                                                e.currentTarget.children[1].classList.remove("block");
                                                e.currentTarget.children[1].classList.add("hidden");
                                            }
                                            if (e.target.classList.contains("claimedKugel")) {
                                                e.target.style.border = "";
                                                setTooltipOpen(false);
                                                // e.target.classList.remove("pulsate-bck");
                                                e.target.children[1].classList.remove("block");
                                                e.target.children[1].classList.add("hidden");
                                            }
                                        }}
                                        toolTiponMouseLeave={(e) => {
                                            e.target.classList.remove("block");
                                            e.target.classList.add("hidden");
                                            if (e.target.parentNode.classList.contains("claimedKugel")) {
                                                e.target.parentNode.style.border = "";
                                            }
                                        }}
                                        klasse={userList.some((e) => e.id === counter - 1) ? "claimedKugel" : null}
                                        toolTipStyle={{
                                            top: isMobile ? kugelWidth + "px" : kugelWidth + 16 + "px",
                                            background: userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].color.toLowerCase()
                                                : "",
                                        }}
                                        toolTipColor={
                                            userList.some((e) => e.id === counter - 1)
                                                ? userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                      "rgb(255, 255, 255)" ||
                                                  userList[getIndex(userList, counter - 1)].color === "#FFF200" ||
                                                  userList[getIndex(userList, counter - 1)].color.toLowerCase() ===
                                                      "rgb(255, 242, 0)"
                                                    ? "text-black"
                                                    : "text-white"
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
                                    >
                                        {props.parent === counter - 1 ? (
                                            <Draggable
                                                klasse={`draggable w-7 h-7 sm:w-10 lg:w-10 lg:h-10 xl:w-12 xl:h-12 shine z-50 absolute touch-none rounded-full indent-[9999px] sm:indent-0 flex items-center justify-center ${
                                                    userData.color == "rgb(255, 255, 255)" ||
                                                    userData.color == "rgb(220, 223, 220)"
                                                        ? "text-black border-4"
                                                        : "text-white"
                                                }`}
                                                style={{
                                                    background: userData.color,
                                                    aspectRatio: 1 / 1,
                                                }}
                                                id="draggable"
                                            ></Draggable>
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
        </>
    );
};

export default Raster;
