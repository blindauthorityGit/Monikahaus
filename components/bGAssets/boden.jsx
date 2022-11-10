import React, { useState, useEffect, useContext } from "react";
import BodenGraphic from "../../assets/boden.svg";
import BodenGraphicMobile from "../../assets/bodenMobile.svg";
import Present1 from "./presentOne";
import Present2 from "./presentTwo";
import SmallTree from "./smallTree";
import { TreeAnimationFinish } from "../../helper/context";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

const Boden = (props) => {
    const { treeAnimationFinish, setTreeAnimationFinish, baumDimensions, setBaumDimensions } =
        useContext(TreeAnimationFinish);

    useEffect(() => {
        console.log(window.innerHeight);
    }, []);

    return (
        <div
            style={
                isMobile
                    ? !treeAnimationFinish
                        ? { top: window.innerHeight - 150 + "px" }
                        : { top: baumDimensions.height + baumDimensions.top + "px" }
                    : null
            }
            className={`w-full top-[px] transition-all absolute ${
                isMobile ? "" : "bottom-0"
            }  bottom-0 overflow z-20  ${props.klasse}`}
        >
            {isMobile ? (
                <img className=" z-30" src={BodenGraphicMobile.src} alt="" />
            ) : (
                <img className=" z-30" src={BodenGraphic.src} alt="" />
            )}
            {isMobile && <div className="bodenFull bg-[#f5f5f5] h-[80%] w-full top-[20%] absolute"></div>}
            {isMobile ? (
                treeAnimationFinish && (
                    <Present1
                        initialX={0}
                        initialY={90}
                        initialRotate={0}
                        rotate={5}
                        x={[0, 0, 0]}
                        y={[null, -2, 0]}
                        initialScale={isMobile ? 0.5 : 1}
                        scale={isMobile ? 0.5 : 1}
                        type="spring"
                        delay={1}
                        duration={0.5}
                        klasse={`top-[-6rem] ${isMobile ? "left-[3%]" : "left-[37%]"} transform z-[-1] rotate-[6deg]`}
                        // style={isMobile ? { left: "7%" } : null}
                    ></Present1>
                )
            ) : (
                <Present1
                    initialX={0}
                    initialY={138}
                    initialRotate={0}
                    rotate={5}
                    x={[0, 0, 0]}
                    y={[null, -2, 0]}
                    initialScale={1}
                    scale={1}
                    type="spring"
                    delay={1}
                    duration={0.5}
                    klasse={`top-[-6rem] left-[37%] transform z-[-1] rotate-[6deg]`}
                    // style={isMobile ? { left: "7%" } : null}
                ></Present1>
            )}
            <Present1
                initialX={0}
                initialY={138}
                initialRotate={0}
                rotate={20}
                x={[0, 0, 0]}
                y={[null, -2, 0]}
                initialScale={isMobile ? 0.5 : 1}
                scale={isMobile ? 0.5 : 1}
                type="spring"
                delay={1.25}
                duration={0.5}
                klasse={`${isMobile ? "hidden" : "block"} top-[-7.5rem] right-[4%] transform z-[-1] rotate-[22deg]`}
            ></Present1>
            {isMobile ? (
                treeAnimationFinish && (
                    <Present2
                        initialX={0}
                        initialY={85}
                        initialRotate={15}
                        rotate={25}
                        x={[0, 0, 0]}
                        y={[null, -2, 0]}
                        initialScale={isMobile ? 0.5 : 1}
                        scale={isMobile ? 0.5 : 1}
                        type="spring"
                        delay={1.5}
                        duration={0.5}
                        klasse="top-[-3.2rem] left-[75%] transform z-[-1] rotate-[6deg]"
                    ></Present2>
                )
            ) : (
                <Present2
                    initialX={0}
                    initialY={130}
                    initialRotate={0}
                    rotate={5}
                    x={[0, 0, 0]}
                    y={[null, -2, 0]}
                    initialScale={isMobile ? 0.5 : 1}
                    scale={isMobile ? 0.5 : 1}
                    type="spring"
                    delay={1.5}
                    duration={0.5}
                    klasse="top-[-5rem] left-[45%] transform z-[-1] rotate-[6deg]"
                ></Present2>
            )}

            {isMobile ? (
                treeAnimationFinish && (
                    <SmallTree
                        initialX={0}
                        initialY={200}
                        x={[0, 0, 0]}
                        y={[null, -2, 0]}
                        initialRotate={0}
                        rotate={7}
                        initialScale={0.5}
                        initialOpacity={0}
                        opacity={1}
                        scale={0.55}
                        type="spring"
                        delay={1.1}
                        duration={0.5}
                        klasse="top-[-3.65rem] left-[60%] transform z-[-1] rotate-[0deg]"
                    ></SmallTree>
                )
            ) : (
                <SmallTree
                    initialX={0}
                    initialY={200}
                    x={[0, 0, 0]}
                    y={[null, -2, 0]}
                    initialScale={1}
                    initialOpacity={0}
                    opacity={1}
                    scale={1}
                    type="spring"
                    delay={1.1}
                    duration={0.5}
                    klasse="top-[-4.5rem] left-[55%] transform z-[-1] rotate-[0deg]"
                ></SmallTree>
            )}

            <SmallTree
                initialX={0}
                initialY={100}
                initialRotate={0}
                rotate={5}
                x={[0, 0, 0]}
                y={[null, -10, -8]}
                initialScale={1}
                scale={0.85}
                type="spring"
                delay={1.25}
                duration={0.75}
                klasse="top-[-3.85rem] hidden sm:block left-[78%] transform z-[-1] scale-[0.6] rotate-[5deg]"
            ></SmallTree>
            <SmallTree
                initialX={0}
                initialY={100}
                initialRotate={0}
                rotate={5}
                x={[0, 0, 0]}
                y={[null, -10, 5]}
                initialScale={0.3}
                scale={0.65}
                type="spring"
                delay={1.35}
                duration={0.75}
                klasse="top-[-4rem] left-[82%] hidden sm:block transform z-[-1] scale-[0.75] rotate-[5deg]"
            ></SmallTree>

            {isMobile ? (
                treeAnimationFinish && (
                    <SmallTree
                        initialX={0}
                        initialY={85}
                        initialRotate={0}
                        rotate={-7}
                        x={[0, 0, 0]}
                        y={[null, -10, 5]}
                        initialScale={0.3}
                        scale={1}
                        type="spring"
                        delay={1.4}
                        duration={0.75}
                        klasse="top-[-3.35rem] left-[33%] transform z-[-1] scale-[1.75] rotate-[-8deg]"
                    ></SmallTree>
                )
            ) : (
                <SmallTree
                    initialX={0}
                    initialY={100}
                    initialRotate={0}
                    rotate={-9}
                    x={[0, 0, 0]}
                    y={[null, -10, 5]}
                    initialScale={0.3}
                    scale={1.65}
                    type="spring"
                    delay={1.4}
                    duration={0.75}
                    klasse="top-[-2rem] left-[30%] transform z-[-1] scale-[1.75] rotate-[-8deg]"
                ></SmallTree>
            )}

            <SmallTree
                initialX={0}
                initialY={100}
                initialRotate={0}
                rotate={-9}
                x={[0, 0, 0]}
                y={[null, -15, -6]}
                initialScale={0.3}
                scale={1.35}
                type="spring"
                delay={1.5}
                duration={0.75}
                klasse="top-[0.75rem] left-[25%] transform z-[-1] scale-[1.25] rotate-[-8deg]"
            ></SmallTree>
        </div>
    );
};

export default Boden;
