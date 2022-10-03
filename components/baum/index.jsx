import React, { useEffect, forwardRef } from "react";
import Img from "next/image";
import { Tree } from "../../config";
import Baum1 from "../../assets/tree1Big.svg";
import Baum2 from "../../assets/tree2Big.svg";
import Baum2Wide from "../../assets/tree2BigWider.svg";
import BaumDoc from "../../assets/baumDoc2.svg";

const Baum = (props, ref) => {
    useEffect(() => {}, []);
    return (
        <div ref={ref}>
            <Img src={BaumDoc} layout="fill"></Img>
        </div>
    );
};

export default forwardRef(Baum);
