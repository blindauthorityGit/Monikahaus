import React, { useState, useEffect, forwardRef, useRef, useContext } from "react";
import Img from "next/image";
import { Tree } from "../../config";
import Baum1 from "../../assets/tree1Big.svg";
import Baum2 from "../../assets/tree2Big.svg";
import Baum2Wide from "../../assets/tree2BigWider.svg";
import BaumDoc from "../../assets/baumDoc2.svg";
import SVG from "./svg";
import Kreis from "../bGAssets/kreis";

import { TreeAnimationFinish } from "../../helper/context";
import { TreeAway } from "../../helper/context";

const Baum = (props, ref) => {
    const { treeAnimationFinish, setTreeAnimationFinish, baumDimensions, setBaumDimensions } =
        useContext(TreeAnimationFinish);
    const { baumWeg, setBaumWeg } = useContext(TreeAway);
    const [height, setHeight] = useState(0);

    const gRef = useRef();

    useEffect(() => {
        function handleResize() {
            // Set window width/height to state
            setBaumDimensions(gRef.current.getBoundingClientRect());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            data-height={height}
            ref={ref}
            className={`absolute w-[90%] lg:w-full h-full pt-4 md:pt-16 `}
            // style={{ height: height + "px" }}
        >
            {/* <Img src={BaumDoc} layout="fill"></Img> */}

            <SVG ref={gRef} closeMe={baumWeg}></SVG>
            <Kreis
                onAnimationComplete={(definition) => {
                    console.log("Completed animating", definition);
                    setTreeAnimationFinish(true);
                    // setBaumHeight(gRef.current.getBoundingClientRect().height);
                    setBaumDimensions(gRef.current.getBoundingClientRect());
                    setHeight(gRef.current.getBoundingClientRect().height);
                }}
                onClick={() => {
                    // setBaumWeg(true);
                    // console.log("BaumWeg");
                }}
            ></Kreis>
        </div>
    );
};

export default forwardRef(Baum);
