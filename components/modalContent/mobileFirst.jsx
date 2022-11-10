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

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const MobileFirst = (props) => {
    const { treeAnimationFinish, setTreeAnimationFinish } = useContext(TreeAnimationFinish);
    const [size, setSize] = useState(0);
    const [checked, setChecked] = useState(0);
    const [color, setColor] = useState(null);
    const [value, setValue] = useState(10);
    const [name, setName] = useState("");
    const [anon, setAnon] = useState(false);

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
        setSize(arr[0].clientHeight);
    }, [treeAnimationFinish]);

    const initialOptions = {
        "client-id": "AaX0OXb-afYDG23QpVOmNi6cPevWn_cTCyD_mmbcH87wYqbGmxlCZLdUTUbJ0WM4PAZEdT7tODT-z5m0",
        currency: "EUR",
        intent: "capture",
        // "data-client-token": "abc123xyz==",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <MainContainer width="fixed relative h-full">
                <div className="col-span-12">
                    <div ref={firstRef} className="wrapper">
                        <H2 klasse="font-bold mb-8">{props.headline}</H2>
                        <div className="topLine mb-10 text-lg italic">
                            Wählen Sie die Farbe Ihrer Kugel, die Spendensumme weitere Infos
                        </div>
                        <ColorChoice
                            size={size}
                            checked={checked}
                            ballRef={ballRef}
                            onChangeColor={onChangeColor}
                            dataTip="Die Farbe Ihrer Kugel"
                        ></ColorChoice>
                        {/* <hr className="mt-6" /> */}
                        <SpendenSumme dataTip="Ihre Spende in EURO" onChange={onChange}></SpendenSumme>
                        {/* <hr className="mt-6" /> */}
                        <NameKugel
                            setName={setName}
                            kugelColor={kugelColor}
                            setKugelColor={setKugelColor}
                            onChange={onChange}
                            dataTip="Ihr Name, wird als Initialen auf der Kugel angezeigt"
                        ></NameKugel>
                        {/* <hr className="mt-6" /> */}
                        <ImageUpload
                            anon={anon}
                            setAnon={setAnon}
                            kugelColor={kugelColor}
                            setKugelColor={setKugelColor}
                            dataTip="Ihr Avatar Bild (optional)"
                        ></ImageUpload>
                        {/* <hr className="mt-6" /> */}
                        <Comment onChange={onChange} dataTip="Ihr Kommentar (optional)"></Comment>
                        <div className="anonym mt-8">
                            <div className="wrapper flex items-center">
                                <img
                                    data-tip="Ihr Name und Spendenbeitrag werden nicht<br /> auf der Kugel und der Spenderliste angezeigt"
                                    data-iscapture="true"
                                    multiline={true}
                                    src={QMark.src}
                                    className="pr-4"
                                    alt=""
                                />
                                <input
                                    className="text-lg p-8 border font-semibold "
                                    type="checkbox"
                                    name="anon"
                                    id="anon"
                                    placeholder="Ihr Name"
                                    onChange={(e) => {
                                        anon ? setAnon(false) : setAnon(true);
                                        anon
                                            ? setKugelColor({ ...kugelColor, anon: false })
                                            : setKugelColor({ ...kugelColor, anon: true });
                                    }}
                                />{" "}
                                <label className="ml-4 text-lg" htmlFor="anon">
                                    Anonyme Spende?
                                </label>
                            </div>
                        </div>
                        <div
                            className={`${
                                userData.color && userData.spende && userData.fullName ? "scale-in-center" : "hidden"
                            } absolute bg-white h-48 w-48 right-[-190px] rounded-full shadow-xl top-[35%] flex items-center justify-center`}
                        >
                            <div className="absolute top-8">DRAG ME</div>
                            <Draggable
                                id="draggable"
                                value="bubu"
                                style={{ width: size + "px", height: size + "px", background: kugelColor.color }}
                                klasse={`${props.isDropped ? "hidden" : "block"} ${
                                    props.isDragging ? "opacity-30" : ""
                                } rounded-full flex items-center justify-center ${
                                    kugelColor.color == "rgb(255, 255, 255)" || kugelColor.color == "rgb(220, 223, 220)"
                                        ? "text-black border-4"
                                        : "text-white"
                                }`}
                            >
                                {anon
                                    ? "Anon"
                                    : name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join(".")}
                            </Draggable>{" "}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            disabled={
                                userData.color && userData.spende && userData.fullName && userData.id ? false : true
                            }
                            className={`${
                                userData.color && userData.spende && userData.fullName && userData.id
                                    ? `bg-[${colors.primaryColor}]`
                                    : "opacity-30"
                            } absolute bottom-0 border px-12 py-4 font-bold`}
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(userData);
                                objectMapper(userData);
                                firstRef.current.classList.add("hidden");
                                secondRef.current.classList.remove("hidden");
                            }}
                        >
                            Weiter
                        </button>
                    </div>
                    {/* KLASSE HIDDEN NOCH BUGGY */}
                    {createPortal(
                        <DragOverlay
                            dropAnimation={{
                                duration: 300,
                                easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                            }}
                        >
                            {props.activeId ? (
                                <Item
                                    style={{ width: size + "px", height: size + "px", background: kugelColor.color }}
                                    value={`Item ${props.activeId}`}
                                    klasse="rounded-full"
                                />
                            ) : null}
                        </DragOverlay>,
                        document.body
                    )}
                    <ReactTooltip multiline={true} />
                </div>
                <div
                    ref={secondRef}
                    id="sumWrapper"
                    data-sum={Number(userData.spende)}
                    className="second hidden col-span-12"
                >
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            console.log(window.localStorage.getItem(""));
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: Number(window.localStorage.getItem("spende")),
                                            // value: document.querySelector("#sumWrapper").dataset.sum,
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            console.log(data);
                            return actions.order.capture().then((details) => {
                                console.log(details);
                                setIsPayed(true);
                                const name = details.payer.name.given_name;
                                const newUser = {
                                    anon: Boolean(window.localStorage.getItem("anon")),
                                    color: window.localStorage.getItem("color"),
                                    email: details.payer.email_adress,
                                    name: window.localStorage.getItem("fullName"),
                                    id: Number(window.localStorage.getItem("id")),
                                    image: window.localStorage.getItem("image"),
                                    sum: Number(window.localStorage.getItem("spende")),
                                    winner: window.localStorage.getItem("winner"),
                                    comment: window.localStorage.getItem("comment"),
                                    claimed: true,
                                };
                                setUserList((current) => [...current, newUser]);
                                console.log(newUser, userList);
                                router.push({
                                    pathname: "/",
                                    query: { id: newUser.id, name: newUser.name, winner: newUser.winner },
                                });
                                setShowOverlay(false);
                                setShowUnclaimed(false);
                                setShowThankYou(true);
                                {
                                    window.localStorage.getItem("winner") == "true" ? setIsWinner(true) : null;
                                }
                            });
                        }}
                    />
                </div>{" "}
            </MainContainer>
        </PayPalScriptProvider>
    );
};

export default MobileFirst;
