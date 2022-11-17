import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../components/layout/mainContainer";
import { startInfo, dev } from "../config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import Welcome from "../assets/welcome.jpg";
import OnBoardTree from "../assets/onBoardTree.svg";

import MobileButton from "../components/layout/mobileButton";
import Link from "next/link";

import MobileIntro from "../assets/mobileIntro.svg";
import Tierheim from "../assets/tierheim.svg";
import Hund from "../assets/hund.svg";
import HundBig from "../assets/hundBig.svg";
import LogoWhite from "../assets/logo_white.svg";
import TierheimLogo from "../assets/tierheimLogo.svg";
import { H1, H2 } from "../components/utils/headlines";
import { useWindowSize, useWindowWidth, useWindowHeight } from "@react-hook/window-size";

import { AiFillCloseCircle } from "react-icons/ai";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Modal = dynamic(() => import("../components/utils/modal"), {
    ssr: false,
});
const ModalFull = dynamic(() => import("../components/utils/modalFull"), {
    ssr: false,
});

export default function Intro() {
    const [opacity, setOpacity] = useState(1);
    const [my_swiper, set_my_swiper] = useState({});

    const [width, height] = useWindowSize();
    const onlyWidth = useWindowWidth();
    const onlyHeight = useWindowHeight();

    const [realHeight, setRealHeight] = useState(0);

    useEffect(() => {
        console.log(onlyHeight);
        setRealHeight(onlyHeight);
        function handleResize() {
            // Set window width/height to state
            setRealHeight(onlyHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Head>
                <title>Spendenbaum Dr John</title>
            </Head>

            <Swiper
                // install Swiper modules
                modules={[Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true, type: "fraction" }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => {
                    window.scrollTo(0, 1);
                }}
                className="pb-6 h-screen"
                onInit={(ev) => {
                    set_my_swiper(ev);
                }}
            >
                <SwiperSlide className="onboardOne h-full w-full lg:grid lg:grid-cols-12 relative">
                    <Link href="/donate">
                        <a className="closer absolute top-4 right-4 lg:top-6 lg:right-6 z-50 text-primaryColorDark">
                            <div className="closer  text-3xl">
                                <AiFillCloseCircle></AiFillCloseCircle>
                            </div>
                        </a>
                    </Link>
                    <div
                        className={`topImg lg:hidden ${
                            realHeight > 680
                                ? "h-[66%] bg-cover md:bg-contain md:bg-no-repeat md:bg-primaryColor"
                                : "h-[50%] bg-contain bg-no-repeat bg-primaryColor"
                        } w-full  bg-bottom relative`}
                        style={{ backgroundImage: `url(${MobileIntro.src})` }}
                    >
                        <img className="absolute bottom-6 left-4 w-48" src={LogoWhite.src} alt="" />
                    </div>
                    <MainContainer width="lg:hidden" noGap>
                        <div className="col-span-12 px-6 md:px-12 mt-6 md:mt-12">
                            <H1>
                                Ein Herz für<br></br> Dreieicher Tiere
                            </H1>
                            <p className="text-lg mt-4">Bitte helfen Sie mit!</p>
                            <div className="mt-10">
                                <MobileButton
                                    klasse=" w-full flex  mt-6 mb-10 "
                                    buttonKlasse="bg-primaryColor"
                                    buttonText="Weiter"
                                    onClick={() => {
                                        my_swiper.slideNext();
                                    }}
                                ></MobileButton>
                            </div>
                        </div>
                    </MainContainer>

                    {/* LG DISPLAYS */}
                    <div
                        className={`topImg hidden lg:block col-span-6 xl:bg-contain ${"h-[100%] bg-cover  md:bg-no-repeat md:bg-primaryColor"} w-full  bg-bottom relative`}
                        style={{ backgroundImage: `url(${MobileIntro.src})` }}
                    >
                        <img className="absolute bottom-6 left-4 w-48" src={LogoWhite.src} alt="" />
                    </div>

                    <MainContainer width="hidden lg:block col-span-6" noGap>
                        <div className="col-span-12 px-6 md:px-12 mt-6 md:mt-12">
                            <H1 klasse="xl:mb-8">
                                Ein Herz für<br></br> Dreieicher Tiere
                            </H1>
                            <p className="text-lg xl:text-3xl mt-4">Bitte helfen Sie mit!</p>
                            <div className="mt-10">
                                <MobileButton
                                    klasse=" w-full flex  mt-6 mb-10 "
                                    buttonKlasse="bg-primaryColor"
                                    buttonText="Weiter"
                                    onClick={() => {
                                        my_swiper.slideNext();
                                    }}
                                ></MobileButton>
                            </div>
                        </div>
                    </MainContainer>
                </SwiperSlide>

                <SwiperSlide className="onboardOne h-full w-full lg:grid lg:grid-cols-12">
                    <Link href="/donate">
                        <a className="closer absolute top-4 right-4 lg:top-6 lg:right-6 z-50 text-primaryColorDark">
                            <div className="closer  text-3xl">
                                <AiFillCloseCircle></AiFillCloseCircle>
                            </div>
                        </a>
                    </Link>
                    <div
                        className={`topImg lg:hidden ${
                            realHeight > 680
                                ? "h-[33%] bg-cover md:bg-contain md:bg-no-repeat md:bg-primaryColor"
                                : "h-[25%] bg-contain bg-no-repeat bg-primaryColor bg-top"
                        } w-full  bg-bottom relative`}
                        style={{ backgroundImage: `url(${Tierheim.src})` }}
                    ></div>
                    <MainContainer width="lg:hidden" noGap>
                        <div className="col-span-12 px-6 md:px-12 mt-6 md:mt-12">
                            <H2 klasse="font-bold text-lg">Tierheime leisten großartige Arbeit!</H2>
                            <div className="text text-sm md:text-base md:w-2/3">
                                <p className=" mt-4">
                                    Sie sorgen dafür, dass jedes Tier Futter, Pflege und Streicheleinheiten bekommt –
                                    und einen Tierarzt, der sich um die Vierbeiner kümmert. !
                                </p>
                                <p className=" mt-4">
                                    Unser Tierheim Dreieich ist aber bereits am Limit – platztechnisch, personell und
                                    finanziell. Steigende Energiepreise, höhere Kosten für Tierfutter und für Tierärzte
                                    verschärfen die ohnehin schon angespannte Situation.
                                </p>
                                <p className="font-bold mt-4">
                                    Mit Ihrer Spende sorgen Sie dafür, dass jedes Lebewesen in unserem Dreieicher
                                    Tierheim das erhält, was es braucht, um sich dort wohl zu fühlen.
                                </p>
                            </div>
                            <div className="logo hidden md:block mt-16">
                                <img src={TierheimLogo.src} alt="" />
                            </div>
                            <div className="mt-10 md:mt-16 ">
                                <MobileButton
                                    klasse=" w-full flex  mt-6 mb-10 "
                                    buttonKlasse="bg-primaryColor"
                                    buttonText="weiter"
                                    onClick={() => {
                                        my_swiper.slideNext();
                                    }}
                                ></MobileButton>
                            </div>
                        </div>
                    </MainContainer>

                    {/* LG DISPLAYS */}
                    <div
                        className={`topImg hidden lg:block col-span-6 ${"h-[100%] bg-cover  md:bg-no-repeat md:bg-primaryColor"} w-full  bg-bottom relative`}
                        style={{ backgroundImage: `url(${Tierheim.src})` }}
                    >
                        <img className="absolute bottom-6 left-4 w-48" src={LogoWhite.src} alt="" />
                    </div>
                    <MainContainer width="hidden lg:block col-span-6 xl:w-2/3">
                        <div className="col-span-12 px-6 md:px-12 mt-6 md:mt-12">
                            <H2 klasse="font-bold text-lg xl:mb-16">Tierheime leisten großartige Arbeit!</H2>
                            <div className="text text-sm md:text-base xl:text-xl">
                                <p className=" mt-4 xl:mt-6">
                                    Sie sorgen dafür, dass jedes Tier Futter, Pflege und Streicheleinheiten bekommt –
                                    und einen Tierarzt, der sich um die Vierbeiner kümmert. !
                                </p>
                                <p className=" mt-4 xl:mt-6">
                                    Unser Tierheim Dreieich ist aber bereits am Limit – platztechnisch, personell und
                                    finanziell. Steigende Energiepreise, höhere Kosten für Tierfutter und für Tierärzte
                                    verschärfen die ohnehin schon angespannte Situation.
                                </p>
                                <p className="font-bold mt-4 xl:mt-6">
                                    Mit Ihrer Spende sorgen Sie dafür, dass jedes Lebewesen in unserem Dreieicher
                                    Tierheim das erhält, was es braucht, um sich dort wohl zu fühlen.
                                </p>
                            </div>
                            <div className="logo hidden md:block mt-16">
                                {/* <img src={TierheimLogo.src} alt="" /> */}
                            </div>
                            <div className="mt-10 md:mt-16 ">
                                <MobileButton
                                    klasse=" w-full flex  mt-6 mb-10 "
                                    buttonKlasse="bg-primaryColor"
                                    buttonText="weiter"
                                    onClick={() => {
                                        my_swiper.slideNext();
                                    }}
                                ></MobileButton>
                            </div>
                        </div>
                    </MainContainer>
                </SwiperSlide>

                <SwiperSlide className="onboardOne h-full w-full lg:grid lg:grid-cols-12">
                    <Link href="/donate">
                        <a className="closer absolute top-4 right-4 lg:top-6 lg:right-6 z-50 text-primaryColorDark">
                            <div className="closer  text-3xl">
                                <AiFillCloseCircle></AiFillCloseCircle>
                            </div>
                        </a>
                    </Link>
                    <div
                        className={`topImg lg:hidden ${
                            realHeight > 680
                                ? "h-[33%] bg-cover md:bg-contain md:bg-no-repeat md:bg-primaryColor"
                                : "h-[25%] bg-contain bg-no-repeat bg-primaryColor bg-top"
                        } w-full  bg-bottom relative`}
                        style={{ backgroundImage: `url(${Hund.src})` }}
                    ></div>
                    <MainContainer width="lg:hidden" noGap>
                        <div className="col-span-12 px-6 md:px-12 mt-6 md:mt-12">
                            <H2 klasse="font-bold text-lg">
                                Deshalb haben wir uns auch etwas ganz Besonderes überlegt:
                            </H2>
                            <div className="text text-sm md:text-base md:w-2/3">
                                <p className=" mt-4">
                                    Auf unserer Website finden Sie einen{" "}
                                    <strong> virtuellen Spendenweihnachtsbaum</strong>, den Sie mit einer Spende direkt
                                    schmücken können.
                                </p>
                                <p className=" mt-4">
                                    Die guten Seelen des <strong>Tierheims Dreieich</strong> und wir freuen uns sehr,
                                    wenn Sie diese Spendenaktion mit großzügigem Herzen unterstützen.
                                </p>
                                <p className="font-bold mt-4">
                                    Vielen Dank im Voraus!<br></br>
                                    <br></br>
                                    Ihre Zahnärztin<br></br> Dr. Katrin John und Team
                                </p>
                            </div>
                            <div className="mt-10 md:mt-16">
                                <Link href="/donate">
                                    <a>
                                        <MobileButton
                                            klasse=" w-full flex  mt-6 mb-10 "
                                            buttonKlasse="bg-black"
                                            buttonText="Los geht's"
                                        ></MobileButton>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </MainContainer>

                    {/* LG DISPLAYS */}
                    <div
                        className={`topImg hidden lg:block col-span-6 ${"h-[100%] bg-cover  md:bg-no-repeat md:bg-primaryColor"} w-full  bg-bottom relative`}
                        style={{ backgroundImage: `url(${HundBig.src})` }}
                    >
                        <img className="absolute bottom-6 left-4 w-48" src={LogoWhite.src} alt="" />
                    </div>
                    <MainContainer width="hidden lg:block col-span-6 xl:w-2/3" noGap>
                        <div className="col-span-12 px-6 md:px-12 mt-6 md:mt-12 ">
                            <H2 klasse="font-bold text-lg xl:mb-16">
                                Deshalb haben wir uns auch etwas ganz Besonderes überlegt:
                            </H2>
                            <div className="text text-sm md:text-base  xl:text-xl">
                                <p className=" mt-4 xl:mt-6">
                                    Auf unserer Website finden Sie einen{" "}
                                    <strong> virtuellen Spendenweihnachtsbaum</strong>, den Sie mit einer Spende direkt
                                    schmücken können.
                                </p>
                                <p className=" mt-4 xl:mt-6">
                                    Die guten Seelen des <strong>Tierheims Dreieich</strong> und wir freuen uns sehr,
                                    wenn Sie diese Spendenaktion mit großzügigem Herzen unterstützen.
                                </p>
                                <p className="font-bold mt-4 xl:mt-6">
                                    Vielen Dank im Voraus!<br></br>
                                    <br></br>
                                    Ihre Zahnärztin<br></br> Dr. Katrin John und Team
                                </p>
                            </div>
                            <div className="mt-10 md:mt-16">
                                <Link href="/donate">
                                    <a>
                                        <MobileButton
                                            klasse=" w-full flex  mt-6 mb-10 "
                                            buttonKlasse="bg-black"
                                            buttonText="Los geht's"
                                        ></MobileButton>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </MainContainer>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
