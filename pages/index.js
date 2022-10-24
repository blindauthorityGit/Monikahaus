import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainContainer from "../components/layout/mainContainer";
import Hero from "../components/Hero/hero";
import { useNextSanityImage } from "next-sanity-image";
import { colors, Tree, startInfo } from "../config";
import { motion } from "framer-motion";

import Raster from "../components/raster";
import Baum from "../components/baum";
import { Boden } from "../components/bGAssets";

import handleScroll from "../functions/handleScroll";
import { TreeAnimationFinish } from "../helper/context";
import { TreeAway } from "../helper/context";
import { ShowUnclaimed } from "../helper/context";
import { KugelColor } from "../helper/context";

import { DndContext, closestCenter } from "@dnd-kit/core";
import Draggable from "../components/dragNDrop/draggable";
// import { droppedZone, draggedZone, handleDragStart, handleDragEnd } from "../functions/dndFunctions";

import StartText from "../components/layout/startText";
import Overlay from "../components/utils/overlay.";
import Modal from "../components/utils/modal";
import FirstModal from "../components/modalContent/first";
import DonatorList from "../components/modalContent/donatorList";

import Goal from "../components/goal";

export default function Home() {
    const [opacity, setOpacity] = useState(1);
    const [rasterDimensions, setRasterDimensions] = useState({});

    const [treeAnimationFinish, setTreeAnimationFinish] = useState(false);
    const [baumWeg, setBaumWeg] = useState(false);
    const [showUnclaimed, setShowUnclaimed] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showList, setShowList] = useState(false);
    const [kugelColor, setKugelColor] = useState({ color: "", name: "", anon: false });

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
        console.log(over ? over.id : null);
        // if (over.id < 14) {
        //     document.getElementById("Pfad_313").classList.add("bounce-right");
        // }
    }

    useEffect(() => {
        baumRef.current.children[0].style.left = "-20px";
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
                <KugelColor.Provider value={{ kugelColor, setKugelColor }}>
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
                        <ShowUnclaimed.Provider value={{ showUnclaimed, setShowUnclaimed }}>
                            <MainContainer width="w-full h-[80%] overflow-hidden">
                                <div className="left col-span-6 relative">
                                    <Goal klasse="w-[472px] top-12 right-0 absolute"></Goal>

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
                                <TreeAnimationFinish.Provider value={{ treeAnimationFinish, setTreeAnimationFinish }}>
                                    <div className="left col-span-6 flex  relative">
                                        <Raster
                                            opacity={opacity}
                                            width={rasterDimensions.width}
                                            height={rasterDimensions.height}
                                            parent={parent}
                                        ></Raster>
                                        <Baum ref={baumRef}></Baum>
                                        {/* {!treeAnimationFinish ? (
                                            <div className="absolute">ANFANG</div>
                                        ) : (
                                            <div className="absolute">ENDE</div>
                                        )} */}
                                    </div>
                                </TreeAnimationFinish.Provider>
                            </MainContainer>
                        </ShowUnclaimed.Provider>
                    </DndContext>
                </KugelColor.Provider>
            </TreeAway.Provider>

            <Boden></Boden>
            {/* <div className="absolute w-full h-screen">
                <div className="absolute w-2/4 h-[80%]  left-1/2 transform -translate-x-1/2 ">
                    <Baum></Baum>
                </div>
            </div> */}
        </>
    );
}
