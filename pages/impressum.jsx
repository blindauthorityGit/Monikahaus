import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../components/layout/mainContainer";

import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

export default function Impressum() {
    const [opacity, setOpacity] = useState(1);

    return (
        <>
            <Head>
                <title>Spendenbaum Dr John</title>
            </Head>

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
                    <h3 className="text-xl">Gestaltung und Programmierung </h3>
                    <p>
                        <a href="https://www.sabocon.com">Sabocon GmbH</a>
                    </p>
                </div>
            </MainContainer>
        </>
    );
}
