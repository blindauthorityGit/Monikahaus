import React from "react";
import MainContainer from "../layout/mainContainer";
import { H2 } from "../utils/headlines";
import Draggable from "../dragNDrop/draggable";

const FirstModal = (props) => {
    return (
        <MainContainer width="fixed">
            <div className="col-span-12">
                <H2>{props.headline}</H2>
                <hr />
                <Draggable></Draggable>
            </div>
        </MainContainer>
    );
};

export default FirstModal;
