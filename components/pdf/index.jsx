import jsPDF from "jspdf";
import Template from "./template";
import { useRef, useState } from "react";
import axios from "axios";

import Choose from "./choose";

const PDF = (props) => {
    return (
        <div>
            <Choose onClickYes={props.onClickYes} onClickNo={props.onClickNo}></Choose>
        </div>
    );
};

export default PDF;
