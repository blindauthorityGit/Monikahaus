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

    const gRef = useRef();

    useEffect(() => {
        console.log(gRef.current.getBoundingClientRect().height);
    }, []);

    return (
        <div ref={ref} className="absolute w-full h-full">
            {/* <Img src={BaumDoc} layout="fill"></Img> */}

            <SVG ref={gRef} closeMe={baumWeg}></SVG>
            <Kreis
                onAnimationComplete={(definition) => {
                    console.log("Completed animating", definition);
                    setTreeAnimationFinish(true);
                    // setBaumHeight(gRef.current.getBoundingClientRect().height);
                    setBaumDimensions(gRef.current.getBoundingClientRect());
                }}
                onClick={() => {
                    setBaumWeg(true);
                    console.log("BaumWeg");
                }}
            ></Kreis>
        </div>
    );
};

export default forwardRef(Baum);
