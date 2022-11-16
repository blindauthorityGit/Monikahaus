import React, { useState, useEffect } from "react";

import { TfiHandPointLeft } from "react-icons/tfi";
import Draggable from "../dragNDrop/draggable";
import { ButtonReal } from "../utils/buttonReal";
import { BtnDirector, BtnDirectorFw } from "../../functions/btnDirector";
import { isBrowser, isMobile } from "react-device-detect";

function ChooseSpace(props) {
    return (
        <div ref={props.seventhRef} className="seventh hidden">
            <div className="font-bold mb-4 text-xl">Ihre Kugel</div>
            <div className="topLine mb-4 text-base italic ">
                Ziehen Sie Ihre Kugel auf ein freies Feld!
                <br />
            </div>
            <div
                className={`${
                    props.userData.color && props.userData.spende ? "scale-in-center" : "hidden"
                }    flex items-center  w-full`}
            >
                <div
                    className={`w-[45%] ${
                        props.userData.id ? "hidden" : ""
                    } text-right pr-5 font-bold text-primaryColor`}
                >
                    {isMobile ? "Rauf ziehen" : "Rüber ziehen"}
                </div>
                <Draggable
                    id="draggable"
                    value="bubu"
                    style={{
                        width: props.size + "px",
                        height: props.size + "px",
                        background: props.kugelColor.color,
                    }}
                    klasse={`${props.isDropped ? "hidden" : "block"} ${
                        props.isDragging ? "opacity-30" : ""
                    } rounded-full flex items-center justify-center touch-none heartbeat w-2/4  ${
                        props.kugelColor.color == "rgb(255, 255, 255)" || props.kugelColor.color == "rgb(220, 223, 220)"
                            ? "text-black border-4"
                            : "text-white"
                    }`}
                >
                    {/* {anon
           ? "Anon"
           : name
                 .split(" ")
                 .map((n) => n[0])
                 .join(".")} */}
                </Draggable>
                <div className={`${props.userData.id ? "hidden" : ""} righ pl-5 text-3xl xl:text-5xl`}>
                    <TfiHandPointLeft></TfiHandPointLeft>
                </div>
                {props.userData.id ? (
                    <div className="super font-bold text-center w-full text-[#32cd32]">Super!</div>
                ) : null}
            </div>
            <div className="grid grid-cols-2 mt-6 w-full gap-4">
                <div className={`w-full `}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={false}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            BtnDirector(props.sixthRef, props.seventhRef);
                        }}
                    >
                        Zurück
                    </ButtonReal>
                </div>
                <div className={`w-full bottom-2  ${props.userData.id ? "" : "opacity-30"}`}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={props.anon ? false : true}
                        klasse={`${
                            props.userData.id ? "bg-[#32cd32]" : "bg-black"
                        }  py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            BtnDirectorFw(props.seventhRef, props.eightRef);
                            props.objectMapper(props.userData);
                        }}
                    >
                        Bezahlen
                    </ButtonReal>
                </div>
            </div>
        </div>
    );
}

export default ChooseSpace;
