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

import ColorChoice from "./colorChoice";
import SpendenSumme from "./spendenSumme";
import NameChoose from "./nameChoose";
import BildChoose from "./bildChoose";
import CommentChoose from "./commentChoose";
import Payment from "./payment";

import MobileSecond from "./mobileSecond";
import ChooseSpace from "./chooseSpace";
import { ButtonReal } from "../utils/buttonReal";
import AnonChoice from "./anonChoice";
import { BtnDirector, BtnDirectorFw } from "../../functions/btnDirector";

import { db } from "../../pages/index";
import { doc, setDoc } from "firebase/firestore/lite";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { dev } from "../../config";

const MobileFirst = (props) => {
    const { treeAnimationFinish, setTreeAnimationFinish } = useContext(TreeAnimationFinish);
    const [size, setSize] = useState(0);
    const [checked, setChecked] = useState(0);
    const [color, setColor] = useState(null);
    const [value, setValue] = useState(10);
    const [name, setName] = useState("");
    const [anon, setAnon] = useState(false);
    const [isChoice, setIsChoice] = useState(false);

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

    useEffect(() => {}, [seventhRef.current]);

    const [donateData, setDonateData] = useState({
        color: "",
        spende: 0,
        fullName: "",
    });

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
        console.log(userData);

        setColor(e.currentTarget.style.backgroundColor);
        setKugelColor({ ...kugelColor, color: e.currentTarget.style.backgroundColor });
    };
    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setDonateData({ ...donateData, [e.target.name]: e.target.value });
        console.log(userData);
    };

    useEffect(() => {
        let arr = Array.from(document.querySelectorAll(".kugel"));
        setSize(36);
        // setSize(arr[0].clientHeight);
    }, [treeAnimationFinish]);

    useEffect(() => {
        let arr = Array.from(document.querySelectorAll(".kugel")).filter((e) => !e.classList.contains("claimedKugel"));
        isChoice
            ? arr.map((e, i) => {
                  let random = Math.random() * 1500;
                  setTimeout(() => {
                      e.classList.add("blinky");
                  }, 300);
                  e.onanimationend = () => {
                      e.classList.remove("blinky");
                  };
              })
            : "";
    }, [isChoice]);

    const initialOptions = {
        "client-id": dev
            ? "AaX0OXb-afYDG23QpVOmNi6cPevWn_cTCyD_mmbcH87wYqbGmxlCZLdUTUbJ0WM4PAZEdT7tODT-z5m0"
            : process.env.NEXT_PUBLIC_CLIENT_ID,
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
                        <div className={`w-full mt-10 ${userData.color ? "" : "opacity-30"}`}>
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
                        <div className="topLine mb-6 text-base italic">
                            Wieviel möchten Sie spenden?
                            <br />
                            Wählen Sie Ihre Summe:
                        </div>
                        <MobileSecond onChange={onChange}></MobileSecond> {/* <hr className="mt-6" /> */}
                        <div className="grid grid-cols-2 mt-10 w-full gap-4">
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
                            <div
                                className={`w-full bottom-2  ${
                                    userData.spende && userData.spende > 0 ? "" : "opacity-30"
                                }`}
                            >
                                <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                                    disabled={userData.spende && userData.spende > 0 ? false : true}
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
                        <div className="topLine mb-6 text-base italic ">
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

                                console.log(userData);
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

                        <div className="grid grid-cols-2 mt-10 w-full gap-4">
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
                                            setIsChoice(true);
                                            unclaimedHighlight();
                                            console.log(userData);
                                        } else {
                                            BtnDirectorFw(thirdRef, fourthRef);
                                            console.log(userData);
                                        }
                                    }}
                                >
                                    Weiter
                                </ButtonReal>
                            </div>
                        </div>
                    </div>

                    {/* NAME */}

                    <NameChoose
                        setName={setName}
                        anon={anon}
                        kugelColor={kugelColor}
                        setKugelColor={setKugelColor}
                        fullName={userData.fullName}
                        thirdRef={thirdRef}
                        fourthRef={fourthRef}
                        fifthRef={fifthRef}
                        onChange={onChange}
                    ></NameChoose>

                    {/* BILD */}

                    <BildChoose
                        anon={anon}
                        setAnon={setAnon}
                        kugelColor={kugelColor}
                        setKugelColor={setKugelColor}
                        image={userData.image}
                        fourthRef={fourthRef}
                        fifthRef={fifthRef}
                        sixthRef={sixthRef}
                    ></BildChoose>

                    {/* COMMENT */}
                    <CommentChoose
                        setIsChoice={setIsChoice}
                        comment={userData.comment}
                        fourthRef={fourthRef}
                        sixthRef={sixthRef}
                        seventhRef={seventhRef}
                        onChange={onChange}
                    ></CommentChoose>
                    {/* KUGEL */}

                    <ChooseSpace
                        size={size}
                        anon={anon}
                        kugelColor={kugelColor}
                        userData={userData}
                        sixthRef={sixthRef}
                        seventhRef={seventhRef}
                        eightRef={eightRef}
                        objectMapper={objectMapper}
                        isDropped={props.isDropped}
                        isDragging={props.isDragging}
                    ></ChooseSpace>

                    {/* PAYPAL */}

                    <Payment
                        setIsPayed={setIsPayed}
                        setUserList={setUserList}
                        setShowOverlay={setShowOverlay}
                        setShowUnclaimed={setShowUnclaimed}
                        setShowThankYou={setShowThankYou}
                        setIsWinner={setIsWinner}
                        seventhRef={seventhRef}
                        eightRef={eightRef}
                        push={router.push}
                    ></Payment>
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
