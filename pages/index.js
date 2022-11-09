import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../components/layout/mainContainer";
import { startInfo } from "../config";

import Raster from "../components/raster";
import Baum from "../components/baum";
import { Boden } from "../components/bGAssets";

import {
    TreeAnimationFinish,
    TreeAway,
    ShowUnclaimed,
    KugelColor,
    UserData,
    UserList,
    ShowOverlay,
} from "../helper/context";

import { DndContext, closestCenter } from "@dnd-kit/core";
// import { droppedZone, draggedZone, handleDragStart, handleDragEnd } from "../functions/dndFunctions";

import StartText from "../components/layout/startText";
import Overlay from "../components/utils/overlay.";
import Modal from "../components/utils/modal";
import FirstModal from "../components/modalContent/first";
import DonatorList from "../components/modalContent/donatorList";
import ThankYou from "../components/thankyou";

import Goal from "../components/goal";
import { testData } from "../dev";

import { isBrowser, isMobile } from "react-device-detect";

export default function Home() {
    const [opacity, setOpacity] = useState(1);
    const [rasterDimensions, setRasterDimensions] = useState({});

    const [treeAnimationFinish, setTreeAnimationFinish] = useState(false);
    const [baumWeg, setBaumWeg] = useState(false);
    const [showUnclaimed, setShowUnclaimed] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showList, setShowList] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [kugelColor, setKugelColor] = useState({ color: "", name: "", anon: false, id: 0 });
    const [userData, setUserData] = useState({
        color: "",
        spende: 0,
        fullName: "",
        image: {},
        comment: "",
        anon: false,
        winner: false,
        email: "",
        id: 0,
    });
    const [userList, setUserList] = useState(testData);

    const baumRef = useRef();

    const [parent, setParent] = useState(null);
    const [isDropped, setIsDropped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [activeId, setActiveId] = useState(null);

    function droppedZone(id, state) {
        const elem = document.getElementById(id);
        if (state) {
            elem.classList.remove("opacity-30");
            elem.classList.add("opacity-100");
        }
    }
    function draggedZone(id) {
        document.getElementById(id).style.opacity = 1;
    }

    function handleDragStart(event) {
        setActiveId(event.active.id);
        setIsDragging(true);
        setIsDropped(false);
    }

    function handleDragEnd(event) {
        const { over } = event;
        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
        setActiveId(null);
        setIsDropped(over ? true : false);
        setIsDragging(false);
        droppedZone(over.id);
        console.log(over ? over.id : null, over);
        setUserData({
            ...userData,
            id: over ? over.id : null,
            winner: Array.from(document.querySelectorAll(".kugel"))[over.id].dataset.iswinner == "true" ? true : false,
        });
        // console.log(
        //     userData,
        //     over.id,
        //     Array.from(document.querySelectorAll(".kugel"))[over.id].dataset.iswinner == "true" ? true : false
        // );

        // if (over.id < 14) {
        //     document.getElementById("Pfad_313").classList.add("bounce-right");
        // }
    }

    useEffect(() => {
        setUserList(testData);

        !isMobile ? (baumRef.current.children[0].style.left = "-20px") : null;

        setRasterDimensions({
            width: baumRef.current.children[0].clientWidth + "px",
            height: (baumRef.current.children[0].clientHeight / 100) * 79 + "px",
        });
        // window.addEventListener("resize", (e) => handleScroll(e, setRasterDimensions, baumRef));
        // return () => {
        //     window.removeEventListener("resize", handleScroll);
        // };
    }, []);

    return (
        <>
            <Head>
                <title>Site title</title>
            </Head>
            <TreeAway.Provider value={{ baumWeg, setBaumWeg }}>
                <ShowOverlay.Provider
                    value={{
                        showOverlay,
                        setShowOverlay,
                        showUnclaimed,
                        setShowUnclaimed,
                        showThankYou,
                        setShowThankYou,
                        isWinner,
                        setIsWinner,
                    }}
                >
                    <UserList.Provider value={{ userList, setUserList }}>
                        <KugelColor.Provider value={{ kugelColor, setKugelColor }}>
                            <UserData.Provider value={{ userData, setUserData }}>
                                <DndContext
                                    collisionDetection={closestCenter}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                >
                                    {showOverlay && (
                                        <>
                                            <Modal
                                                onClick={() => {
                                                    setShowOverlay(false);
                                                    setShowUnclaimed(false);
                                                }}
                                            >
                                                <FirstModal
                                                    headline="Schenken Sie Hoffnung"
                                                    activeId={activeId}
                                                    isDropped={isDropped}
                                                    isDragging={isDragging}
                                                ></FirstModal>
                                            </Modal>

                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    <div
                                        onClick={() => {
                                            setShowList(true);
                                        }}
                                        className="btn z-50 p-10 bg-[#7d866f] absolute flex justify-center items-center text-3xl text-white"
                                    >
                                        +
                                    </div>
                                    {showList && (
                                        <>
                                            <Modal
                                                onClick={() => {
                                                    setShowOverlay(false);
                                                    setShowList(false);
                                                }}
                                            >
                                                <DonatorList></DonatorList>
                                            </Modal>
                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    {showThankYou && (
                                        <>
                                            <ThankYou
                                                isWinner={isWinner}
                                                onClick={() => {
                                                    setShowOverlay(false);
                                                    setShowThankYou(false);
                                                }}
                                            ></ThankYou>
                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    <ShowUnclaimed.Provider value={{ showUnclaimed, setShowUnclaimed }}>
                                        <MainContainer
                                            id="fireworksContainer"
                                            width="container h-screen md:h-[80%] overflow-hidden"
                                        >
                                            <div className="left hidden md:block order-last sm:order-first col-span-12 md:col-span-6 relative">
                                                <Goal data={userList} klasse="w-[472px] top-12 right-0 absolute"></Goal>

                                                <StartText
                                                    headline={startInfo.headline}
                                                    subline={startInfo.subline}
                                                    buttonText={startInfo.buttonText}
                                                    onClick={() => {
                                                        setShowOverlay(true);
                                                        setShowUnclaimed(true);
                                                    }}
                                                ></StartText>
                                            </div>
                                            <TreeAnimationFinish.Provider
                                                value={{ treeAnimationFinish, setTreeAnimationFinish }}
                                            >
                                                <div className="left col-span-12 md:col-span-6 flex relative">
                                                    <Raster
                                                        opacity={opacity}
                                                        width={rasterDimensions.width}
                                                        height={rasterDimensions.height}
                                                        parent={parent}
                                                    ></Raster>
                                                    <Baum ref={baumRef}></Baum>
                                                </div>
                                            </TreeAnimationFinish.Provider>
                                        </MainContainer>
                                    </ShowUnclaimed.Provider>
                                </DndContext>
                            </UserData.Provider>
                        </KugelColor.Provider>
                    </UserList.Provider>
                </ShowOverlay.Provider>
            </TreeAway.Provider>

            {isMobile ? null : <Boden></Boden>}
        </>
    );
}
