import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";

import MainContainer from "../layout/mainContainer";
import { H2 } from "../utils/headlines";
import Draggable from "../dragNDrop/draggable";
import { DragOverlay } from "@dnd-kit/core";
import Item from "../dragNDrop/item";
import { createPortal } from "react-dom";
import Droppable from "../dragNDrop/droppable";
import { TreeAnimationFinish, KugelColor, UserData, UserList, ShowOverlay } from "../../helper/context";
import Slider from "react-rangeslider";
import QMark from "../../assets/qmark.svg";
import ReactTooltip from "react-tooltip";

import ColorChoice from "./colorChoice";
import SpendenSumme from "./spendenSumme";
import NameKugel from "./NameKugel";
import ImageUpload from "./imageUpload";
import Comment from "./comment";

import { colors } from "../../config";
import { testData } from "../../dev";

import axios from "axios";
import { Fireworks } from "fireworks-js";

import MobileSecond from "./mobileSecond";
import Button from "../utils/buttons";
import { ButtonReal } from "../utils/buttonReal";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const MobileFirst = (props) => {
    const { treeAnimationFinish, setTreeAnimationFinish } = useContext(TreeAnimationFinish);
    const [size, setSize] = useState(0);
    const [checked, setChecked] = useState(0);
    const [color, setColor] = useState(null);
    const [value, setValue] = useState(10);
    const [name, setName] = useState("");
    const [anon, setAnon] = useState(false);

    //BUTTON STUFF
    const [firstBtn, setFirstBtn] = useState(true);

    // PAYMENT STUFF
    const [isPayed, setIsPayed] = useState(false);

    const { kugelColor, setKugelColor } = useContext(KugelColor);
    const { userData, setUserData } = useContext(UserData);
    const { userList, setUserList } = useContext(UserList);
    const { showOverlay, setShowOverlay } = useContext(ShowOverlay);
    const { showUnclaimed, setShowUnclaimed } = useContext(ShowOverlay);
    const { showThankYou, setShowThankYou } = useContext(ShowOverlay);
    const { isWinner, setIsWinner } = useContext(ShowOverlay);

    const ballRef = useRef();
    const firstRef = useRef();
    const secondRef = useRef();

    const router = useRouter();

    const [donateData, setDonateData] = useState({
        color: "",
        spende: 0,
        fullName: "",
    });

    const redirectToCheckout = async () => {
        const {
            data: { id },
        } = await axios.post("/api/checkout_sessions");
    };

    const objectMapper = (object1) => {
        for (const [key, value] of Object.entries(object1)) {
            console.log(`${key}`, `${value}`);
            localStorage.setItem(`${key}`, `${value}`);
        }
    };

    // const { value } = value;

    const onChangeColor = (e) => {
        let arr = Array.from(ballRef.current.querySelectorAll(".colorBall"));
        arr.map((e) => e.children[0].classList.add("hidden"));
        arr[e.currentTarget.dataset.id].children[0].classList.remove("hidden");
        arr[e.currentTarget.dataset.id].children[0].classList.add("block");
        setChecked(e.currentTarget.dataset.id);
        setUserData({ ...userData, [e.currentTarget.id]: e.currentTarget.style.backgroundColor });
        setDonateData({ ...donateData, [e.currentTarget.id]: e.currentTarget.style.backgroundColor });

        setColor(e.currentTarget.style.backgroundColor);
        setKugelColor({ ...kugelColor, color: e.currentTarget.style.backgroundColor });
    };
    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setDonateData({ ...donateData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        let arr = Array.from(document.querySelectorAll(".kugel"));
        setSize(36);
        // setSize(arr[0].clientHeight);
    }, [treeAnimationFinish]);

    const initialOptions = {
        "client-id": "AaX0OXb-afYDG23QpVOmNi6cPevWn_cTCyD_mmbcH87wYqbGmxlCZLdUTUbJ0WM4PAZEdT7tODT-z5m0",
        currency: "EUR",
        intent: "capture",
        // "data-client-token": "abc123xyz==",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <MainContainer noGap={true} width="fixed relative h-full">
                <div className="col-span-12 relative">
                    <div ref={firstRef} className="wrapper">
                        <div className="font-bold mb-4 text-xl">{props.headline}</div>
                        <div className="topLine mb-10 text-base italic">
                            Gestalten Sie Ihre Spendenkugel!
                            <br />
                            Wählen Sie Ihre Farbe:
                        </div>
                        <ColorChoice
                            size={size}
                            checked={checked}
                            ballRef={ballRef}
                            onChangeColor={onChangeColor}
                            dataTip="Die Farbe Ihrer Kugel"
                            wrapperKlasse="items-center"
                            isMobile={true}
                        ></ColorChoice>
                        <div className={`w-full bottom-2 absolute ${userData.color ? "" : "opacity-30"}`}>
                            <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                disabled={userData.color ? false : true}
                                klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                onClick={() => {
                                    console.log("TEST");
                                }}
                            >
                                Weiter
                            </ButtonReal>
                        </div>
                        {/* <hr className="mt-6" /> */}
                    </div>
                    <div className="second hidden">
                        <MobileSecond onChange={onChange}></MobileSecond> {/* <hr className="mt-6" /> */}
                    </div>
                </div>
            </MainContainer>
        </PayPalScriptProvider>
    );
};

export default MobileFirst;
