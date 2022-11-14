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
import AnonChoice from "./anonChoice";

import { db } from "../../pages/index";
import { doc, setDoc } from "firebase/firestore/lite";

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
    const anonRef = useRef();
    const firstRef = useRef();
    const secondRef = useRef();
    const thirdRef = useRef();
    const fourthRef = useRef();
    const fifthRef = useRef();
    const sixthRef = useRef();
    const seventhRef = useRef();
    const eightRef = useRef();

    const router = useRouter();

    const [donateData, setDonateData] = useState({
        color: "",
        spende: 0,
        fullName: "",
    });

    function BtnDirector(backRef, forwardFef) {
        backRef.current.classList.remove("hidden");
        backRef.current.classList.add("block");
        forwardFef.current.classList.remove("block");
        forwardFef.current.classList.add("hidden");
    }
    function BtnDirectorFw(backRef, forwardFef) {
        backRef.current.classList.add("hidden");
        forwardFef.current.classList.remove("hidden");
        forwardFef.current.classList.add("block");
    }

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

    function unclaimedHighlight() {
        let arr = Array.from(document.querySelectorAll(".kugel")).filter((e) => !e.classList.contains("claimedKugel"));
        arr.map((e, i) => {
            let random = Math.random() * 500;
            setTimeout(() => {
                e.classList.add("pulsate-bck");
            }, random);
        });
    }

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

    function createSpender(spender) {
        fireBaseRef
            .doc()
            .set(spender)
            .catch((err) => {
                console.error(err);
            });
    }

    async function dataDB(user, userData) {
        await setDoc(doc(db, "spender", user), userData);
    }
    // async function dataTest(user, userData) {
    //     await setDoc(doc(db, "spender", user), userData);
    // }

    useEffect(() => {
        if (isPayed) {
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
            dataDB("bubu", newUser);
            console.log(newUser);
        }
    }, [isPayed]);

    return (
        <PayPalScriptProvider options={initialOptions}>
            <MainContainer noGap={true} width="fixed relative h-full">
                <div className="col-span-12 relative">
                    <div ref={firstRef} className="wrapper">
                        <div className="font-bold mb-4 text-xl">{props.headline}</div>
                        <div className="topLine mb-8 text-base italic">
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
                        <div className={`w-full mt-12 ${userData.color ? "" : "opacity-30"}`}>
                            <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                disabled={userData.color ? false : true}
                                klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                onClick={() => {
                                    BtnDirectorFw(firstRef, secondRef);
                                }}
                            >
                                Weiter
                            </ButtonReal>
                        </div>
                        {/* <hr className="mt-6" /> */}
                    </div>
                    <div ref={secondRef} className="second hidden">
                        <div className="font-bold mb-4 text-xl">Spendensumme</div>
                        <div className="topLine mb-8 text-base italic">
                            Wieviel möchten Sie spenden?
                            <br />
                            Wählen Sie Ihre Summe:
                        </div>
                        <MobileSecond onChange={onChange}></MobileSecond> {/* <hr className="mt-6" /> */}
                        <div className="grid grid-cols-2 mt-12 w-full gap-4">
                            <div className={`w-full `}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={false}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        console.log("TEST");
                                        firstRef.current.classList.remove("hidden");
                                        firstRef.current.classList.add("block");
                                        secondRef.current.classList.remove("block");
                                        secondRef.current.classList.add("hidden");
                                    }}
                                >
                                    Zurück
                                </ButtonReal>
                            </div>
                            <div className={`w-full bottom-2  ${userData.spende ? "" : "opacity-30"}`}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={userData.spende ? false : true}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirectorFw(secondRef, thirdRef);
                                    }}
                                >
                                    Weiter
                                </ButtonReal>
                            </div>
                        </div>
                    </div>

                    {/* ANON */}

                    <div ref={thirdRef} className="third hidden">
                        <div className="font-bold mb-4 text-xl">Ihre Daten</div>
                        <div className="topLine mb-10 text-base italic ">
                            Möchten Sie anonym bleiben oder Ihre Daten sichtbar machen?
                            <br />
                            {/* <span className="text-xs leading-tight">
                                {" "}
                                Sie können Ihren Namen, ein Bild, die Spendensumme und ein Kommentar hinterlassen, das
                                für andere sichtbar wird:
                            </span> */}
                        </div>
                        <AnonChoice
                            ref={anonRef}
                            onClickNonAnon={(e) => {
                                anonRef.current.children[0].classList.add("bg-black", "text-white");
                                document.querySelector("#nonAnon").classList.add("bg-black", "text-white");
                                document.querySelector("#anon").classList.remove("bg-black", "text-white");
                                anonRef.current.children[1].classList.remove("bg-black", "text-white");
                                setUserData({ ...userData, anon: false });
                                setAnon(true);
                                console.log(anonRef.current.children[0].classList);
                            }}
                            onClickAnon={(e) => {
                                anonRef.current.children[1].classList.add("bg-black", "text-white");
                                anonRef.current.children[0].classList.remove("bg-black", "text-white");
                                document.querySelector("#nonAnon").classList.remove("bg-black", "text-white");
                                document.querySelector("#anon").classList.add("bg-black", "text-white");

                                setUserData({ ...userData, anon: true });
                                setAnon(true);
                                console.log(userData);
                            }}
                        ></AnonChoice>

                        <div className="grid grid-cols-2 mt-12 w-full gap-4">
                            <div className={`w-full `}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={false}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirector(secondRef, thirdRef);
                                    }}
                                >
                                    Zurück
                                </ButtonReal>
                            </div>
                            <div className={`w-full bottom-2  ${anon ? "" : "opacity-30"}`}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={anon ? false : true}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        if (userData.anon) {
                                            BtnDirectorFw(thirdRef, seventhRef);
                                            unclaimedHighlight();
                                        } else {
                                            BtnDirectorFw(thirdRef, fourthRef);
                                        }
                                    }}
                                >
                                    Weiter
                                </ButtonReal>
                            </div>
                        </div>
                    </div>

                    {/* NAME */}

                    <div ref={fourthRef} className="fourth hidden">
                        <div className="font-bold mb-4 text-xl">Ihre Daten</div>
                        <div className="topLine mb-4 text-base italic ">
                            Ihr Name wird als auf Ihren Kugel-Daten angezeigt (optional)
                            <br />
                            {/* <span className="text-xs leading-tight">
                                {" "}
                                Sie können Ihren Namen, ein Bild, die Spendensumme und ein Kommentar hinterlassen, das
                                für andere sichtbar wird:
                            </span> */}
                        </div>
                        <NameKugel
                            setName={setName}
                            kugelColor={kugelColor}
                            setKugelColor={setKugelColor}
                            onChange={onChange}
                            dataTip="Ihr Name, wird als Initialen auf der Kugel angezeigt"
                        ></NameKugel>
                        {/* <hr className="mt-6" /> */}

                        <div className="grid grid-cols-2 mt-12 w-full gap-4">
                            <div className={`w-full `}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={false}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirector(thirdRef, fourthRef);
                                    }}
                                >
                                    Zurück
                                </ButtonReal>
                            </div>
                            <div className={`w-full bottom-2  ${anon ? "" : "opacity-30"}`}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={anon ? false : true}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirectorFw(fourthRef, fifthRef);
                                    }}
                                >
                                    {userData.fullName ? "Weiter" : "Überspringen"}
                                </ButtonReal>
                            </div>
                        </div>
                    </div>

                    {/* BILD */}

                    <div ref={fifthRef} className="fifth hidden">
                        <div className="font-bold mb-4 text-xl">Ihre Daten</div>
                        <div className="topLine mb-4 text-base italic ">
                            Ihr Bild wird neben Ihrem Namen ang (optional)
                            <br />
                        </div>
                        <ImageUpload
                            anon={anon}
                            setAnon={setAnon}
                            kugelColor={kugelColor}
                            setKugelColor={setKugelColor}
                            dataTip="Ihr Avatar Bild (optional)"
                        ></ImageUpload>

                        <div className="grid grid-cols-2 mt-12 w-full gap-4">
                            <div className={`w-full `}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={false}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirector(fourthRef, fifthRef);
                                    }}
                                >
                                    Zurück
                                </ButtonReal>
                            </div>
                            <div className={`w-full bottom-2  ${anon ? "" : "opacity-30"}`}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={anon ? false : true}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirectorFw(fifthRef, sixthRef);
                                    }}
                                >
                                    {userData.image ? "Weiter" : "Überspringen"}
                                </ButtonReal>
                            </div>
                        </div>
                    </div>

                    {/* COMMENT */}

                    <div ref={sixthRef} className="sixth hidden">
                        <div className="font-bold mb-4 text-xl">Ihre Daten</div>
                        <div className="topLine mb-4 text-base italic ">
                            Ihr Kommentar, max 60 Zeichen (optional)
                            <br />
                        </div>
                        <Comment onChange={onChange} dataTip="Ihr Kommentar (optional)"></Comment>

                        <div className="grid grid-cols-2 mt-12 w-full gap-4">
                            <div className={`w-full `}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={false}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirector(fifthRef, sixthRef);
                                    }}
                                >
                                    Zurück
                                </ButtonReal>
                            </div>
                            <div className={`w-full bottom-2  ${anon ? "" : "opacity-30"}`}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={anon ? false : true}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirectorFw(sixthRef, seventhRef);
                                    }}
                                >
                                    {userData.image ? "Weiter" : "Überspringen"}
                                </ButtonReal>
                            </div>
                        </div>
                    </div>
                    {/* KUGEL */}

                    <div ref={seventhRef} className="seventh hidden">
                        <div className="font-bold mb-4 text-xl">Ihre Kugel</div>
                        <div className="topLine mb-4 text-base italic ">
                            Ziehen Sie Ihre Kugel auf ein freies Feld Ihrer Wahl oben auf den Baum!
                            <br />
                        </div>
                        <div
                            className={`${
                                userData.color && userData.spende ? "scale-in-center" : "hidden"
                            }  bg-white h-36 w-36  rounded-full shadow-xl  flex items-center justify-center`}
                        >
                            <div className="absolute top-8">DRAG ME</div>
                            <Draggable
                                id="draggable"
                                value="bubu"
                                style={{ width: size + "px", height: size + "px", background: kugelColor.color }}
                                klasse={`${props.isDropped ? "hidden" : "block"} ${
                                    props.isDragging ? "opacity-30" : ""
                                } rounded-full flex items-center justify-center touch-none pulsate-bck ${
                                    kugelColor.color == "rgb(255, 255, 255)" || kugelColor.color == "rgb(220, 223, 220)"
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
                            </Draggable>{" "}
                        </div>
                        <div className="grid grid-cols-2 mt-12 w-full gap-4">
                            <div className={`w-full `}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={false}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirector(sixthRef, seventhRef);
                                    }}
                                >
                                    Zurück
                                </ButtonReal>
                            </div>
                            <div className={`w-full bottom-2  ${userData.id ? "" : "opacity-30"}`}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={anon ? false : true}
                                    klasse={`${
                                        userData.id ? "bg-[#32cd32]" : "bg-black"
                                    } hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirectorFw(seventhRef, eightRef);
                                        objectMapper(userData);
                                    }}
                                >
                                    Bezahlen
                                </ButtonReal>
                            </div>
                        </div>
                    </div>

                    {/* PAYPAL */}

                    <div ref={eightRef} className="eight hidden">
                        <div className="font-bold mb-4 text-xl">Bezahlung</div>
                        <div className="topLine mb-4 text-base italic ">
                            Wählen Sie Ihre Bezahlart:
                            <br />
                        </div>
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
                                    setShowThankYou(true);

                                    // dataDB(newUser.colo, newUser);
                                    // console.log(newUser, userList);
                                    router.push({
                                        pathname: "/",
                                        query: { id: newUser.id, name: newUser.name, winner: newUser.winner },
                                    });
                                    setShowOverlay(false);
                                    setShowUnclaimed(false);
                                    {
                                        window.localStorage.getItem("winner") == "true" ? setIsWinner(true) : null;
                                    }
                                });
                            }}
                        />

                        <div className="grid grid-cols-2 mt-12 w-full gap-4">
                            <div className={`w-full `}>
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={false}
                                    klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                                    onClick={() => {
                                        BtnDirector(fifthRef, sixthRef);
                                    }}
                                >
                                    Zurück
                                </ButtonReal>
                            </div>
                        </div>
                    </div>
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
                                    klasse="rounded-full touch-none"
                                />
                            ) : null}
                        </DragOverlay>,
                        document.body
                    )}
                </div>
            </MainContainer>
        </PayPalScriptProvider>
    );
};

export default MobileFirst;
