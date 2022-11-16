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
import { HiChevronLeft } from "react-icons/hi";

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

export default function Impressum() {
    const [opacity, setOpacity] = useState(1);

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
                className="pb-6 "
            >
                <MainContainer width="container p-16">
                    <Link href="/donate">
                        <a className="text-4xl">
                            <HiChevronLeft></HiChevronLeft>
                        </a>
                    </Link>
                    <div className="col-span-12 relative text">
                        <h2 className="text-4xl mb-8">Impressum</h2>
                        <p>
                            Dr. Katrin John<br></br>
                            Zahnärztin für Oralchirurgie
                        </p>
                        <p>
                            Fahrgasse 33<br></br>
                            63303 Dreieich
                        </p>
                        <p>
                            Tel. 06103 / 844 66<br></br>
                            Fax 06103 / 988 61 42<br></br>
                            E‑Mail zahnarzt@praxis-dreieich.de<br></br>
                            <a href="www.zahnarztpraxis-dreieich.de"> www.zahnarztpraxis-dreieich.de</a>
                        </p>
                        <h3 className="text-xl">Gestaltung und Programmierung der Website</h3>
                        <p>
                            <a href="https://www.sabocon.com">Sabocon</a>
                        </p>
                    </div>
                </MainContainer>
            </Swiper>
        </>
    );
}
