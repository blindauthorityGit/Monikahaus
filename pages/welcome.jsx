import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../components/layout/mainContainer";
import { startInfo, dev } from "../config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import Welcome from "../assets/welcome.jpg";

import MobileButton from "../components/layout/mobileButton";

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

export default function Home() {
    const [opacity, setOpacity] = useState(1);

    return (
        <>
            <Head>
                <title>Site title</title>
            </Head>
            <MainContainer noGap>
                <div className="col-span-12 relative p-10">
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log("slide change")}
                    >
                        <SwiperSlide>
                            <>
                                <div className="pb-8">
                                    <h1 className="text-2xl font-bold mb-8">
                                        Ein Herz für Dreieicher Tiere. Bitte helfen Sie mit !
                                    </h1>
                                    <div className="text text-sm">
                                        <p>
                                            Tierheime leisten großartige Arbeit! Sie sorgen dafür, dass jedes Tier
                                            Futter, Pflege und Streicheleinheiten bekommt – und einen Tierarzt, der sich
                                            um die Vierbeiner kümmert.
                                        </p>

                                        <p>
                                            Unser <strong> Tierheim Dreieich</strong> ist aber bereits am Limit –
                                            platztechnisch, personell und finanziell. Steigende Energiepreise, höhere
                                            Kosten für Tierfutter und für Tierärzte verschärfen die ohnehin schon
                                            angespannte Situation.
                                        </p>

                                        <p>
                                            Mit Ihrer Spende sorgen Sie dafür, dass jedes Lebewesen in unserem
                                            Dreieicher Tierheim das erhält, was es braucht, um sich dort wohl zu fühlen.
                                        </p>

                                        <p>
                                            Deshalb haben wir uns auch etwas ganz Besonderes überlegt:
                                            <br /> Auf unserer Homepage finden Sie einen{" "}
                                            <strong> virtuellen Spendenweihnachtsbaum,</strong>
                                            den Sie mit einer Spende direkt schmücken können. Die guten Seelen des
                                            Tierheims Dreieich und wir freuen uns sehr, wenn Sie diese Spendenaktion mit
                                            großzügigem Herzen unterstützen.
                                        </p>

                                        <p>Vielen Dank im Voraus!</p>
                                        <img className="mb-4" src={Welcome.src} alt="Welcome" />

                                        <p className="italic">Ihre Zahnärztin Dr. Katrin John & Team</p>
                                    </div>{" "}
                                    <MobileButton
                                        klasse=" w-full flex sm:hidden mt-6 mb-10 "
                                        buttonText="Los gehts"
                                        onClick={() => {}}
                                    ></MobileButton>
                                </div>
                            </>
                        </SwiperSlide>
                        <SwiperSlide></SwiperSlide>
                        <SwiperSlide></SwiperSlide>
                    </Swiper>
                </div>
            </MainContainer>
        </>
    );
}
