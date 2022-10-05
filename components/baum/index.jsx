import React, { useEffect, forwardRef } from "react";
import Img from "next/image";
import { Tree } from "../../config";
import Baum1 from "../../assets/tree1Big.svg";
import Baum2 from "../../assets/tree2Big.svg";
import Baum2Wide from "../../assets/tree2BigWider.svg";
import BaumDoc from "../../assets/baumDoc2.svg";
import SVG from "./svg";
import Kreis from "../bGAssets/kreis";

const Baum = (props, ref) => {
    useEffect(() => {}, []);
    return (
        <div ref={ref} className="absolute w-full h-full">
            {/* <Img src={BaumDoc} layout="fill"></Img> */}

            <SVG></SVG>
            <Kreis></Kreis>
        </div>
    );
};

export default forwardRef(Baum);
