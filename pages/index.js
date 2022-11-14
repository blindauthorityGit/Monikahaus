import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../components/layout/mainContainer";
import { startInfo, dev } from "../config";
import Baum from "../components/baum";
// import { Boden, BodenMobile } from "../components/bGAssets";

import {
    TreeAnimationFinish,
    TreeAway,
    ShowUnclaimed,
    KugelColor,
    UserData,
    UserList,
    ShowOverlay,
} from "../helper/context";

import { DndContext, closestCenter } from "@dnd-kit/core";

import StartText from "../components/layout/startText";
import MobileButton from "../components/layout/mobileButton";
import Overlay from "../components/utils/overlay.";
// import Modal from "../components/utils/modal";
import FirstModal from "../components/modalContent/first";
import MobileFirst from "../components/modalContent/mobileFirst";
import ThankYou from "../components/thankyou";
import { MdPeople, MdInfoOutline } from "react-icons/md";

import Goal from "../components/goal";
import { testData } from "../dev";

// import { app } from "../components/firebase";

import { isBrowser, isMobile } from "react-device-detect";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQAvM7L_wh22VQHwbq6IBT2Fyc01jIIHY",
    authDomain: "spendenbaum-john.firebaseapp.com",
    projectId: "spendenbaum-john",
    storageBucket: "spendenbaum-john.appspot.com",
    messagingSenderId: "987219338463",
    appId: "1:987219338463:web:e23928a16b675c4bff356a",
    measurementId: "G-08CDZPFB9W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const firebase = dynamic(() => import("../components/firebase"), {
//     ssr: false,
// });

const DonatorList = dynamic(() => import("../components/modalContent/donatorList"), {
    ssr: false,
});
const Raster = dynamic(() => import("../components/raster"), {
    ssr: false,
});
const Boden = dynamic(() => import("../components/bGAssets/boden"), {
    ssr: false,
});
const Modal = dynamic(() => import("../components/utils/modal"), {
    ssr: false,
});
const ModalFull = dynamic(() => import("../components/utils/modalFull"), {
    ssr: false,
});
const TierheimContent = dynamic(() => import("../components/modalContent/tierheimContent"), {
    ssr: false,
});
// const Baum = dynamic(() => import("../components/baum"), {
//     ssr: false,
// });
export { db };
export default function Home() {
    const [opacity, setOpacity] = useState(1);
    const [rasterDimensions, setRasterDimensions] = useState({});

    const [data, setData] = useState({});

    const [treeAnimationFinish, setTreeAnimationFinish] = useState(false);
    const [baumDimensions, setBaumDimensions] = useState({ width: 0, height: 0 });
    const [baumWeg, setBaumWeg] = useState(false);
    const [showUnclaimed, setShowUnclaimed] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showList, setShowList] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [kugelColor, setKugelColor] = useState({ color: "", name: "", anon: false, id: 0 });
    const [userData, setUserData] = useState({
        color: "",
        spende: 0,
        fullName: "",
        image: "",
        comment: "",
        anon: false,
        winner: false,
        email: "",
        id: null,
    });
    const [userList, setUserList] = useState(dev ? testData : []);

    const baumRef = useRef();

    const [parent, setParent] = useState(null);
    const [isDropped, setIsDropped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [activeId, setActiveId] = useState(null);

    function droppedZone(id, state) {
        const elem = document.getElementById(id);
        if (state) {
            elem.classList.remove("opacity-30");
            elem.classList.add("opacity-100");
        }
    }
    function draggedZone(id) {
        document.getElementById(id).style.opacity = 1;
    }

    function handleDragStart(event) {
        setActiveId(event.active.id);
        setIsDragging(true);
        setIsDropped(false);
    }

    function handleDragEnd(event) {
        const { over } = event;
        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
        setActiveId(null);
        setIsDropped(over ? true : false);
        setIsDragging(false);
        droppedZone(over.id);
        console.log(over ? over.id : null, over);
        setUserData({
            ...userData,
            id: over ? over.id : null,
            winner: Array.from(document.querySelectorAll(".kugel"))[over.id].dataset.iswinner == "true" ? true : false,
        });
        console.log(userData.id);
        // console.log(
        //     userData,
        //     over.id,
        //     Array.from(document.querySelectorAll(".kugel"))[over.id].dataset.iswinner == "true" ? true : false
        // );

        // if (over.id < 14) {
        //     document.getElementById("Pfad_313").classList.add("bounce-right");
        // }
    }

    useEffect(() => {
        // setUserList(testData);

        async function getData(db) {
            const spenderCol = collection(db, "spender");
            const spenderSnapshot = await getDocs(spenderCol);
            const spenderList = spenderSnapshot.docs.map((doc) => doc.data());
            console.log(spenderList);
            return spenderList;
        }
        dev ? setUserList(testData) : setUserList(getData(db));
        console.log(getData(db));
        // process.env.NEXT_DEV ? setUserList(testData) : setUserList(getData(db));

        !isMobile ? (baumRef.current.children[0].style.left = "-20px") : null;

        window.scrollTo(0, 1);
        console.log(app);

        // setRasterDimensions({
        //     width: baumRef.current.children[0].clientWidth + "px",
        //     height: (baumHeight / 100) * 79 + "px",
        // });
        // window.addEventListener("resize", (e) => handleScroll(e, setRasterDimensions, baumRef));
        // return () => {
        //     window.removeEventListener("resize", handleScroll);
        // };
    }, []);

    useEffect(() => {
        console.log(baumDimensions, baumDimensions.width, baumDimensions.height);
        setRasterDimensions({
            width: baumDimensions.width + "px",
            height: (baumDimensions.height / 100) * 79 + "px",
        });
    }, [baumDimensions]);

    async function dataDB(userData) {
        await addDoc(collection(db, "spender"), userData);
    }
    // async function dataTest(user, userData) {
    //     await setDoc(doc(db, "spender", user), userData);
    // }

    useEffect(() => {
        if (showThankYou) {
            const newUser = {
                anon: Boolean(window.localStorage.getItem("anon")),
                color: window.localStorage.getItem("color"),
                // email: details.payer.email_adress,
                name: window.localStorage.getItem("fullName"),
                id: Number(window.localStorage.getItem("id")),
                image: window.localStorage.getItem("image"),
                sum: Number(window.localStorage.getItem("spende")),
                winner: window.localStorage.getItem("winner"),
                comment: window.localStorage.getItem("comment"),
                claimed: true,
            };
            dataDB(newUser);
            console.log(newUser);
        }
    }, [showThankYou]);

    return (
        <>
            <Head>
                <title>Site title</title>
            </Head>
            <TreeAway.Provider value={{ baumWeg, setBaumWeg }}>
                <ShowOverlay.Provider
                    value={{
                        showOverlay,
                        setShowOverlay,
                        showUnclaimed,
                        setShowUnclaimed,
                        showThankYou,
                        setShowThankYou,
                        isWinner,
                        setIsWinner,
                    }}
                >
                    <UserList.Provider value={{ userList, setUserList }}>
                        <KugelColor.Provider value={{ kugelColor, setKugelColor }}>
                            <UserData.Provider value={{ userData, setUserData }}>
                                <DndContext
                                    collisionDetection={closestCenter}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                >
                                    {showOverlay && (
                                        <>
                                            <Modal
                                                onClick={() => {
                                                    setShowOverlay(false);
                                                    setShowUnclaimed(false);
                                                    // isMobile ? document.exitFullscreen() : null;
                                                    // setIsFullScreen(false);
                                                    setUserData({
                                                        color: "",
                                                        spende: 0,
                                                        fullName: "",
                                                        image: "",
                                                        comment: "",
                                                        anon: false,
                                                        winner: false,
                                                        email: "",
                                                        id: null,
                                                    });
                                                }}
                                            >
                                                {isMobile ? (
                                                    <MobileFirst
                                                        headline="Schenken Sie Hoffnung"
                                                        activeId={activeId}
                                                        isDropped={isDropped}
                                                        isDragging={isDragging}
                                                    ></MobileFirst>
                                                ) : (
                                                    <FirstModal
                                                        headline="Schenken Sie Hoffnung"
                                                        activeId={activeId}
                                                        isDropped={isDropped}
                                                        isDragging={isDragging}
                                                    ></FirstModal>
                                                )}
                                            </Modal>

                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    <div className="btnWrapper absolute top-[22%] sm:top-0 right-0 sm:right-auto z-30">
                                        <div
                                            onClick={() => {
                                                setShowList(true);
                                            }}
                                            className="btn mb-2 rounded-l-lg sm:rounded-r-lg  z-50 p-3 sm:p-10 bg-black sm:bg-[#7d866f]  sm:flex justify-center items-center text-3xl text-white"
                                        >
                                            <MdPeople></MdPeople>
                                        </div>{" "}
                                        <div
                                            onClick={() => {
                                                setShowInfo(true);
                                            }}
                                            className="btn rounded-l-lg sm:rounded-r-lg    p-3 sm:p-10 bg-black sm:bg-[#7d866f]  sm:flex justify-center items-center text-3xl text-white"
                                        >
                                            <MdInfoOutline></MdInfoOutline>
                                        </div>
                                    </div>
                                    {showList && (
                                        <>
                                            {isMobile ? (
                                                <ModalFull
                                                    onClick={() => {
                                                        setShowOverlay(false);
                                                        setShowList(false);
                                                    }}
                                                >
                                                    <DonatorList></DonatorList>
                                                </ModalFull>
                                            ) : (
                                                <Modal
                                                    onClick={() => {
                                                        setShowOverlay(false);
                                                        setShowList(false);
                                                    }}
                                                >
                                                    <DonatorList></DonatorList>
                                                </Modal>
                                            )}

                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    {showInfo && (
                                        <>
                                            {isMobile ? (
                                                <ModalFull
                                                    noFixed
                                                    onClick={() => {
                                                        setShowOverlay(false);
                                                        setShowInfo(false);
                                                    }}
                                                >
                                                    <TierheimContent></TierheimContent>
                                                </ModalFull>
                                            ) : (
                                                <Modal
                                                    onClick={() => {
                                                        setShowOverlay(false);
                                                        setShowInfo(false);
                                                    }}
                                                >
                                                    <TierheimContent></TierheimContent>
                                                </Modal>
                                            )}

                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    {showThankYou && (
                                        <>
                                            <ThankYou
                                                isWinner={isWinner}
                                                onClick={() => {
                                                    setShowOverlay(false);
                                                    setShowThankYou(false);
                                                }}
                                            ></ThankYou>
                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    <ShowUnclaimed.Provider value={{ showUnclaimed, setShowUnclaimed }}>
                                        <TreeAnimationFinish.Provider
                                            value={{
                                                treeAnimationFinish,
                                                setTreeAnimationFinish,
                                                baumDimensions,
                                                setBaumDimensions,
                                                isFullScreen,
                                                setIsFullScreen,
                                            }}
                                        >
                                            <MainContainer
                                                id="fireworksContainer"
                                                width="container h-full min-h-[100%] md:h-[80%] overflow-hidden relative"
                                            >
                                                <div className="left hidden md:block order-last sm:order-first col-span-12 md:col-span-6 relative">
                                                    <Goal
                                                        data={userList}
                                                        klasse="w-[472px] top-12 right-0 absolute"
                                                    ></Goal>

                                                    <StartText
                                                        headline={startInfo.headline}
                                                        subline={startInfo.subline}
                                                        buttonText={startInfo.buttonText}
                                                        onClick={() => {
                                                            setShowOverlay(true);
                                                            setShowUnclaimed(true);
                                                        }}
                                                    ></StartText>
                                                </div>
                                                <div className="left px-5 sm:px-0 col-span-12 md:col-span-6 flex justify-center relative">
                                                    <Raster
                                                        opacity={opacity}
                                                        width={rasterDimensions.width}
                                                        height={rasterDimensions.height}
                                                        parent={parent}
                                                        data={data}
                                                    ></Raster>
                                                    <Baum ref={baumRef}></Baum>
                                                </div>{" "}
                                                {/* GOALS MOBILE */}
                                                <div
                                                    // style={{ top: baumDimensions.height + 120 + "px" }}
                                                    className={`sm:hidden z-30 absolute bottom-36 w-2/3 left-1/2 transform -translate-x-1/2`}
                                                >
                                                    <Goal data={userList} klasse=""></Goal>
                                                </div>
                                                {/* STARTTEST MOBILE */}
                                                {/* <div className="absolute sm:hidden bottom-36 z-40 w-full text-center  left-1/2 transform -translate-x-1/2 text-xl font-bold ">
                                                    {startInfo.headline}
                                                </div> */}
                                                <MobileButton
                                                    klasse="absolute w-3/4 flex sm:hidden bottom-12 z-30  left-1/2 transform -translate-x-1/2 "
                                                    buttonText={startInfo.buttonText}
                                                    onClick={() => {
                                                        setShowOverlay(true);
                                                        setShowUnclaimed(true);

                                                        // isMobile ? document.body.requestFullscreen() : null;
                                                        // isMobile ? setIsFullScreen(true) : null;
                                                        setBaumDimensions(
                                                            baumRef.current.children[0].children[0].getBoundingClientRect()
                                                        );
                                                    }}
                                                ></MobileButton>
                                            </MainContainer>
                                            {/* {isMobile ? <BodenMobile /> : <Boden></Boden>} */}

                                            <Boden></Boden>
                                        </TreeAnimationFinish.Provider>
                                    </ShowUnclaimed.Provider>
                                </DndContext>
                            </UserData.Provider>
                        </KugelColor.Provider>
                    </UserList.Provider>
                </ShowOverlay.Provider>
            </TreeAway.Provider>
        </>
    );
}
