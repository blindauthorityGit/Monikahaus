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
import Home from "./donate";

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

export default function Index() {
    const [opacity, setOpacity] = useState(1);

    return (
        <>
            <Head>
                <title>Unser Spendenbaum</title>
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
                className="pb-6 "
            >
                <MainContainer>
                    <div className="col-span-12 relative">
                        <SwiperSlide className="p-10">
                            <>
                                <div className="pb-8">
                                    <h1 className="text-2xl font-bold mb-8">
                                        Ein Herz für Dreieicher Tiere. Bitte helfen Sie mit!
                                    </h1>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-12 lg:col-span-4">
                                            <img className="mb-4" src={Welcome.src} alt="Welcome" />
                                        </div>
                                        <div className="col-span-12 lg-col-span-8">
                                            <div className="text text-sm">
                                                <p>
                                                    Tierheime leisten großartige Arbeit! Sie sorgen dafür, dass jedes
                                                    Tier Futter, Pflege und Streicheleinheiten bekommt – und einen
                                                    Tierarzt, der sich um die Vierbeiner kümmert.
                                                </p>

                                                <p>
                                                    Unser <strong> Tierheim Dreieich</strong> ist aber bereits am Limit
                                                    – platztechnisch, personell und finanziell. Steigende Energiepreise,
                                                    höhere Kosten für Tierfutter und für Tierärzte verschärfen die
                                                    ohnehin schon angespannte Situation.
                                                </p>

                                                <p>
                                                    Mit Ihrer Spende sorgen Sie dafür, dass jedes Lebewesen in unserem
                                                    Dreieicher Tierheim das erhält, was es braucht, um sich dort wohl zu
                                                    fühlen.
                                                </p>

                                                <p>
                                                    Deshalb haben wir uns auch etwas ganz Besonderes überlegt:
                                                    <br /> Auf unserer Homepage finden Sie einen{" "}
                                                    <strong> virtuellen Spendenweihnachtsbaum,</strong>
                                                    den Sie mit einer Spende direkt schmücken können. Die guten Seelen
                                                    des Tierheims Dreieich und wir freuen uns sehr, wenn Sie diese
                                                    Spendenaktion mit großzügigem Herzen unterstützen.
                                                </p>

                                                <p>Vielen Dank im Voraus!</p>

                                                <p className="italic">Ihre Zahnärztin Dr. Katrin John und Team</p>
                                            </div>{" "}
                                            <div className="hidden lg:block">
                                                <Link href="/donate">
                                                    <a>
                                                        <MobileButton
                                                            klasse=" w-full flex  mt-6 mb-10 "
                                                            buttonText="Los gehts"
                                                            onClick={() => {}}
                                                        ></MobileButton>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:hidden">
                                        <Link href="/donate">
                                            <a>
                                                <MobileButton
                                                    klasse=" w-full flex  mt-6 mb-10 "
                                                    buttonText="Los gehts"
                                                    onClick={() => {}}
                                                ></MobileButton>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        </SwiperSlide>
                        <SwiperSlide className="onboardOne h-full w-screen p-10">
                            <div className="pb-8">
                                <h1 className="text-2xl font-bold mb-8">Wie funktioniert der Spendenbaum?</h1>
                                <div className="tree w-3/4">
                                    <img src={OnBoardTree.src} alt="" />
                                </div>
                                <div className="text">
                                    <p className="font-bold mt-6">Das Prinzip ist denkbar simpel!</p>
                                    <p>
                                        Schmücken Sie unseren Baum mit Ihrer großzügigen Spende und unterstützen Sie
                                        damit das Tierheim Dreieich!
                                    </p>
                                    <p>
                                        Klicken Sie auf den <strong>Jetzt spenden</strong> Button, gestalten Sie Ihre
                                        Kugel und platzieren Sie schlussendlich die Kugel auf einem freien Platz am
                                        Baum.
                                    </p>
                                    <p>Danach bleibt Ihre Kugel für alle sichtbar auf dem Baum!</p>
                                    <p>
                                        Sie können mit <strong> Ihrem Namen</strong> aufscheinen oder auch
                                        <strong> anonym</strong> spenden.
                                    </p>
                                    <p className="font-bold mt-6">Ihre Spende lässt unseren Baum erstrahlen!</p>
                                    <p>
                                        Unsere Aktion läuft bis Weihnachten, danach wird die Spendensumme den Tierheim
                                        Dreieich übergeben.
                                        <br /> Ihre Spende bleibt danach auch noch weiterhin für alle sichtbar auf
                                        unserem Baum!
                                    </p>
                                </div>
                                <Link href="/donate">
                                    <a>
                                        <MobileButton
                                            klasse=" w-full flex  mt-10 mb-10 "
                                            buttonText="Los gehts"
                                            onClick={() => {}}
                                        ></MobileButton>
                                    </a>
                                </Link>
                            </div>
                        </SwiperSlide>
                    </div>{" "}
                    <div className="swiper-pagination pagination-top"></div>
                    <div className="swiper-pagination pagination-bottom"></div>
                </MainContainer>
            </Swiper>
        </>
    );
}
