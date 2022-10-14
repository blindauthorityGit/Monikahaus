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

import StartText from "../components/layout/startText";
import Overlay from "../components/utils/overlay.";
import Modal from "../components/utils/modal";

// function StartText() {
//     return (
//         <div className="wrapper relative flex items-center h-full justify-end">
//             <div className="caller w-2/4">
//                 <H1 klasse="text-3xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl">
//                     {startInfo.headline}
//                 </H1>
//                 <p className="mt-6 text-lg"> {startInfo.subline}</p>
//                 <Button // style={{ background: colors.primaryColor.toLowerCase() }}
//                     klasse={`mt-8 bg-primaryColor hover:bg-primaryColorDark py-4 rounded-lg text-white font-bold uppercase text-xl leading-loose tracking-wider cursor-pointer`}
//                 >
//                     {startInfo.buttonText}
//                 </Button>
//             </div>
//         </div>
//     );
// }

export default function Home() {
    const [isDragging, setIsDragging] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const [rasterDimensions, setRasterDimensions] = useState({});

    const [treeAnimationFinish, setTreeAnimationFinish] = useState(false);
    const [baumWeg, setBaumWeg] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const baumRef = useRef();

    useEffect(() => {
        console.log(colors, Tree);
        console.log(baumRef.current.children[0].clientWidth);
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
                {showOverlay && (
                    <>
                        <Modal
                            onClick={() => {
                                setShowOverlay(false);
                            }}
                        ></Modal>
                        <Overlay></Overlay>
                    </>
                )}
                <MainContainer width="w-full h-[80%] overflow-hidden">
                    <div className="left col-span-6">
                        <StartText
                            headline={startInfo.headline}
                            subline={startInfo.subline}
                            buttonText={startInfo.buttonText}
                            onClick={() => {
                                setShowOverlay(true);
                            }}
                        ></StartText>
                        {/* <motion.div
                        drag
                        dragSnapToOrigin
                        onDragStart={(event, info) => {
                            setIsDragging(true);
                            setOpacity(0.3);
                        }}
                        onDragEnd={(event, info) => {
                            setIsDragging(false);
                            setOpacity(0);
                            console.log(event);
                        }}
                        whileDrag={{ scale: 1.2 }}
                        className="circle z-50 relative w-[100px] h-[100px] bg-red-700 rounded-2xl "
                    ></motion.div>
                    {isDragging && <div>WIR ZIEHEN</div>} */}
                    </div>
                    <TreeAnimationFinish.Provider value={{ treeAnimationFinish, setTreeAnimationFinish }}>
                        <div className="left col-span-6 flex  relative">
                            <Raster
                                opacity={opacity}
                                width={rasterDimensions.width}
                                height={rasterDimensions.height}
                            ></Raster>
                            <Baum ref={baumRef}></Baum>
                            {!treeAnimationFinish ? (
                                <div className="absolute">ANFANG</div>
                            ) : (
                                <div className="absolute">ENDE</div>
                            )}
                        </div>
                    </TreeAnimationFinish.Provider>
                </MainContainer>
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
