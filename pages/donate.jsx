import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../components/layout/mainContainer";
import { startInfo, dev, local, showGoal } from "../config";
import Baum from "../components/baum";
import { useRouter } from "next/router";

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
import MobileFirst from "../components/modalContent/mobileFirst";
import MenuContent from "../components/modalContent/menuContent";
import QuittungForm from "../components/modalContent/quittung";
import ThankYou from "../components/thankyou";
import { MdPeople, MdInfoOutline } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import Goal from "../components/goal";
import { testData, dataFiller } from "../dev";

import { isMobile } from "react-device-detect";

import { app, db, storage } from "../config/firebase";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import CookieConsent from "react-cookie-consent";

import Snowfall from "react-snowfall";
import axios from "axios";

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
const ModalMenu = dynamic(() => import("../components/utils/modalMenu"), {
    ssr: false,
});
const ModalFull = dynamic(() => import("../components/utils/modalFull"), {
    ssr: false,
});
const TierheimContent = dynamic(() => import("../components/modalContent/tierheimContent"), {
    ssr: false,
});

export { db, storage };
export default function Home({ spenderList }) {
    const [opacity, setOpacity] = useState(1);
    const [rasterDimensions, setRasterDimensions] = useState({});

    const [data, setData] = useState({});

    const [treeAnimationFinish, setTreeAnimationFinish] = useState(false);
    const [baumDimensions, setBaumDimensions] = useState({ width: 0, height: 0 });
    const [baumWeg, setBaumWeg] = useState(false);
    const [showUnclaimed, setShowUnclaimed] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showList, setShowList] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [showQuittung, setShowQuittung] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [kugelColor, setKugelColor] = useState({ color: "", name: "", anon: false, id: 0 });
    const [userData, setUserData] = useState({
        color: "",
        spende: 0,
        fullName: "",
        image: [],
        comment: "",
        anon: false,
        winner: false,
        email: "",
        id: null,
    });
    const [userList, setUserList] = useState(dev ? (local ? dataFiller : spenderList) : spenderList);

    const baumRef = useRef();
    const containerRef = useRef();

    const [parent, setParent] = useState(null);
    const [isDropped, setIsDropped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [activeId, setActiveId] = useState(null);

    // IMAGES
    // DARSTELLUNG
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, `images/`);

    // ROUTER
    const router = useRouter();
    const secret = router.query["dev"];
    const [showSecret, setShowSecret] = useState(false);

    useEffect(() => {
        secret ? setShowSecret(true) : null;
    }, [router]);

    function droppedZone(id, state) {
        const elem = document.getElementById(id);
        if (state) {
            elem.classList.remove("opacity-30");
            elem.classList.add("opacity-100");
        }
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
        console.log(over.id);
        setUserData({
            ...userData,
            id: over ? over.id : null,
            // winner: Array.from(document.querySelectorAll(".kugel"))[over.id].dataset.iswinner == "true" ? true : false,
        });
    }

    useEffect(() => {
        !isMobile ? (baumRef.current.children[0].style.left = "-20px") : null;
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setRasterDimensions({
            width: baumDimensions.width + "px",
            height: (baumDimensions.height / 100) * 79 + "px",
        });
    }, [baumDimensions]);

    async function dataDB(userData) {
        const spenderCol = collection(db, dev ? "test" : "spender");
        const spenderSnapshot = await getDocs(spenderCol);
        const spenderList = spenderSnapshot.docs.map((doc) => doc.data());
        console.log(spenderList.some((e) => e.id === userData.id));
        if (spenderList.some((e) => e.id === userData.id)) {
            alert(
                "Während dem Spendenvorgang wurde Ihr Platz von jemand anderem gewählt. Bitte wiederholen Sie den Vorgang auf einem anderen, freien Platz."
            );
        } else {
            await addDoc(collection(db, dev ? "test" : "spender"), userData);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            async function sendEmail() {
                let config = {
                    method: "post",
                    // url: `http://localhost:3000/api/contact`,
                    url: `/api/quittung`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        body: "Testbody",
                        email: "office@atelierbuchner.at",
                    },
                };
                // console.log(values);

                try {
                    const response = await axios(config);
                } catch (err) {
                    console.log(err);
                }
            }

            // sendEmail();
        }, 5000);
    }, []);

    useEffect(() => {
        if (showThankYou) {
            const uploadImage = () => {
                if (userData.image.length > 0) {
                    const imageUpload = userData.image[0].file;
                    const imageRef = ref(storage, `${userData.id}`);
                    uploadBytes(imageRef, imageUpload)
                        .then((snapshot) => {
                            return getDownloadURL(snapshot.ref);
                        })
                        .then((url) => {
                            console.log(url);
                            const imageUrl = url;
                            const newUser = {
                                anon: window.localStorage.getItem("anon") === "true",
                                color: window.localStorage.getItem("color"),
                                email: window.localStorage.getItem("email"),
                                name: window.localStorage.getItem("fullName"),
                                id: Number(window.localStorage.getItem("id")),
                                image: imageUrl,
                                sum: Number(window.localStorage.getItem("spende")),
                                winner: window.localStorage.getItem("winner"),
                                comment: window.localStorage.getItem("comment"),
                                claimed: true,
                            };
                            dataDB(newUser);
                            // async function sendEmail() {
                            //     let config = {
                            //         method: "post",
                            //         // url: `http://localhost:3000/api/contact`,
                            //         url: `/api/quittung`,
                            //         headers: {
                            //             "Content-Type": "application/json",
                            //         },
                            //         data: {
                            //             body: "Testbody",
                            //             email: "office@atelierbuchner.at",
                            //         },
                            //     };
                            //     // console.log(values);

                            //     try {
                            //         const response = await axios(config);
                            //     } catch (err) {
                            //         console.log(err);
                            //     }
                            // }
                            // sendEmail();
                        });
                } else {
                    const newUser = {
                        anon: window.localStorage.getItem("anon") === "true",
                        color: window.localStorage.getItem("color"),
                        email: window.localStorage.getItem("email"),
                        name: window.localStorage.getItem("fullName"),
                        id: Number(window.localStorage.getItem("id")),
                        sum: Number(window.localStorage.getItem("spende")),
                        winner: window.localStorage.getItem("winner"),
                        comment: window.localStorage.getItem("comment"),
                        claimed: true,
                    };
                    dataDB(newUser);
                    // async function sendEmail() {
                    //     let config = {
                    //         method: "post",
                    //         // url: `http://localhost:3000/api/contact`,
                    //         url: `/api/quittung`,
                    //         headers: {
                    //             "Content-Type": "application/json",
                    //         },
                    //         data: {
                    //             body: "Testbody",
                    //             email: "office@atelierbuchner.at",
                    //         },
                    //     };
                    //     // console.log(values);

                    //     try {
                    //         const response = await axios(config);
                    //     } catch (err) {
                    //         console.log(err);
                    //     }
                    // }
                    // sendEmail();
                }
            };

            uploadImage();
        }
    }, [showThankYou]);

    return (
        <>
            <Head>
                <title>Spendenbaum Dr John</title>
            </Head>

            <div
                onClick={() => {
                    console.log("Burger Open");
                    setShowMenu(true);
                }}
                className="burger absolute top-4 right-4 text-3xl z-50"
            >
                <RiMenu3Fill></RiMenu3Fill>
            </div>

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
                                                    <MobileFirst
                                                        headline="Schenken Sie Hoffnung"
                                                        activeId={activeId}
                                                        isDropped={isDropped}
                                                        isDragging={isDragging}
                                                    ></MobileFirst>
                                                )}
                                            </Modal>

                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    <div className="btnWrapper absolute top-[16%] lg:top-8 right-0 lg:right-auto z-30">
                                        <div
                                            onClick={() => {
                                                setShowList(true);
                                            }}
                                            className="btn mb-2 mobile-only:rounded-l-lg lg:rounded-l-auto lg:rounded-r-lg  z-50 p-3 lg:p-6 bg-black  lg:flex justify-center items-center text-2xl text-white"
                                        >
                                            <MdPeople></MdPeople>
                                        </div>{" "}
                                        <div
                                            onClick={() => {
                                                setShowInfo(true);
                                            }}
                                            className="btn mobile-only:rounded-l-lg  lg:rounded-l-auto lg:rounded-r-lg  p-3 lg:p-6 bg-black  lg:flex justify-center items-center text-2xl text-white"
                                        >
                                            <MdInfoOutline></MdInfoOutline>
                                        </div>
                                    </div>

                                    {showMenu && (
                                        <>
                                            {isMobile ? (
                                                <ModalMenu
                                                    noFixed={false}
                                                    onClick={() => {
                                                        setShowOverlay(false);
                                                        setShowMenu(false);
                                                    }}
                                                >
                                                    <MenuContent></MenuContent>
                                                </ModalMenu>
                                            ) : (
                                                <ModalMenu
                                                    onClick={() => {
                                                        setShowOverlay(false);
                                                        setShowMenu(false);
                                                    }}
                                                >
                                                    <MenuContent></MenuContent>
                                                </ModalMenu>
                                            )}

                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    {showList && (
                                        <>
                                            {isMobile ? (
                                                <ModalFull
                                                    noFixed={false}
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
                                                    window.location.reload();
                                                }}
                                                onClickYes={() => {
                                                    setShowQuittung(true);
                                                    setShowThankYou(false);

                                                    console.log("Front Yes");
                                                }}
                                            ></ThankYou>
                                            <Overlay></Overlay>
                                        </>
                                    )}
                                    {showQuittung && (
                                        <>
                                            {isMobile ? (
                                                <ModalFull
                                                    noFixed
                                                    onClick={() => {
                                                        setShowOverlay(false);
                                                        setShowQuittung(false);
                                                    }}
                                                >
                                                    <QuittungForm
                                                        sum={Number(window.localStorage.getItem("spende"))}
                                                    ></QuittungForm>
                                                </ModalFull>
                                            ) : (
                                                <Modal
                                                    onClick={() => {
                                                        setShowOverlay(false);
                                                        setShowQuittung(false);
                                                    }}
                                                >
                                                    <QuittungForm></QuittungForm>
                                                </Modal>
                                            )}

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
                                                imageList,
                                                setImageList,
                                            }}
                                        >
                                            <MainContainer
                                                id="fireworksContainer"
                                                width="container h-full min-h-[100%] lg:h-[80%] overflow-hidden relative"
                                                ref={containerRef}
                                            >
                                                <Snowfall />
                                                <div className="left lg:h-[80%] pl-[25%] xl:pl-0 xl:pr-[20%] pt-[15%] lg:pt-0 hidden lg:block order-last sm:order-first col-span-12 lg:col-span-6 lg:flex lg:items-center relative">
                                                    {showGoal && <Goal data={userList} klasse="w-full mb-16 "></Goal>}

                                                    <StartText
                                                        headline={startInfo.headline}
                                                        buttonText={startInfo.buttonText}
                                                        onClick={() => {
                                                            setShowOverlay(true);
                                                            setShowUnclaimed(true);
                                                        }}
                                                    ></StartText>
                                                </div>
                                                <div className="left px-5 lg:px-0 col-span-12 lg:col-span-6 flex justify-center relative">
                                                    <Raster
                                                        opacity={opacity}
                                                        width={rasterDimensions.width}
                                                        height={rasterDimensions.height}
                                                        parent={parent}
                                                        data={userList}
                                                    ></Raster>
                                                    <Baum ref={baumRef}></Baum>
                                                </div>{" "}
                                                {/* GOALS MOBILE */}
                                                <div
                                                    className={`lg:hidden z-30 absolute bottom-36 md:bottom-56 w-2/3 left-1/2 transform -translate-x-1/2`}
                                                >
                                                    {showGoal ||
                                                        (showSecret && (
                                                            <Goal secret={secret} data={userList} klasse=""></Goal>
                                                        ))}
                                                </div>
                                                <MobileButton
                                                    klasse="absolute w-3/4 flex lg:hidden bottom-16 md:bottom-24 z-30  left-1/2 transform -translate-x-1/2 "
                                                    buttonText={startInfo.buttonText}
                                                    onClick={() => {
                                                        setShowOverlay(true);
                                                        setShowUnclaimed(true);
                                                        setBaumDimensions(
                                                            baumRef.current.children[0].children[0].getBoundingClientRect()
                                                        );
                                                    }}
                                                ></MobileButton>
                                            </MainContainer>

                                            <Boden></Boden>
                                            <CookieConsent
                                                location="bottom"
                                                buttonText="Einverstanden"
                                                cookieName="myAwesomeCookieName2"
                                                style={{ background: "#000" }}
                                                buttonStyle={{
                                                    color: "#4e503b",
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                    padding: "0.5rem 0.75rem",
                                                }}
                                                expires={150}
                                            >
                                                Wir verwenden Cookies, um die Benutzung der Website zu optimieren.
                                                <span style={{ fontSize: "12px", display: "block", marginTop: "1rem" }}>
                                                    Hiermit sind sie damit einverstanden.
                                                </span>
                                            </CookieConsent>
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

export async function getStaticProps() {
    const spenderCol = collection(db, dev ? "test" : "spender");
    const spenderSnapshot = await getDocs(spenderCol);
    const spenderList = spenderSnapshot.docs.map((doc) => doc.data());

    return {
        props: {
            spenderList,
        },
        revalidate: 1, // 10 seconds
    };
}
