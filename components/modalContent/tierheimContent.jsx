import React, { useState, useEffect, useContext } from "react";
import MainContainer from "../layout/mainContainer";
import Logo from "../../assets/Logo ganz neu_small.jpg";
import Leitung from "../../assets/leitung.jpg";
import Schaeferhund from "../../assets/schaeferhund.jpg";
import Kater from "../../assets/kater.jpg";
import Kaninchen from "../../assets/kaninchen.jpg";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const TierheimContent = () => {
    return (
        <MainContainer noGap={true} width="fixed relative h-full">
            <div className="col-span-12 pt-10 sm:pt-0">
                <img className="w-24 mb-8" src={Logo.src} alt="" />
                <div className="textor text-xs sm:text-base">
                    <p>
                        Das Tierheim Dreieich wird geführt und verwaltet von dem gemeinnützigen Verein{" "}
                        <strong>„Tierheim Dreieich e.V.“</strong> , dessen fünfköpfiger Vorstand ehrenamtlich tätig ist.
                    </p>
                    <p>
                        Die Mitglieder des Vereins bestehen aus den Kommunen:
                        <strong>
                            Dreieich, Egelsbach, Heusenstamm, Langen, Mühlheim am Main, Neu-Isenburg, Obertshausen und
                            Seligenstadt.
                        </strong>
                        <br /> Die Mitgliedskommunen zahlen eine Pauschale, die an der Zahl ihrer Einwohner gemessen
                        wird, hiervon können die <strong>lfd. Kosten des Tierheims</strong> zu ca. zwei Dritteln gedeckt
                        werden. Für das fehlende Drittel ist das Tierheim auf Spenden, Patenschaften, etc. angewiesen.
                    </p>
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
                            <img src={Schaeferhund.src} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Kater.src} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Kaninchen.src} alt="" />
                        </SwiperSlide>
                    </Swiper>
                    <p className="mt-4">
                        Im Tierheim Dreieich werden Tiere untergebracht und versorgt, die im Gebiet der
                        Mitgliedsgemeinden aufgefunden werden oder betreuungsbedürftig geworden sind (Fund- und
                        Abgabetiere). Sofern die <strong>Platzverhältnisse</strong> es erlauben, werden auch
                        Pensionstiere aufgenommen, während des Urlaubs oder einer Krankheit ihrer HalterInnen.
                    </p>
                    <p>
                        Die <strong>Gebäude des Tierheims wurden 1971 erbaut</strong> und sind nun sehr „in die Jahre
                        gekommen“. Es stehen viele <strong>Sanierungsmaßnahmen</strong> an, die nach und nach angegangen
                        werden müssen. Außerdem entspricht die Unterbringung der Tiere teilweise nicht mehr den{" "}
                        <strong>heutigen Standards</strong>, z. Bsp. wird heutzutage eine Gruppenhaltung angestrebt und
                        keine „Einzelhaft“ mehr.
                    </p>
                    <p>
                        Da die Tiere auch oft aus einer Beschlagnahmung durch das Veterinäramt oder auch aus{" "}
                        <strong>Krankheits- und Sterbefällen</strong> der Besitzer/innen ins Tierheim kommen, ist in den
                        meisten dieser Fälle <strong>teure und aufwendige medizinische Behandlung</strong> notwendig, da
                        die Tiere zuvor nicht mehr ausreichend versorgt wurden. Insbesondere bei den Hunden ist es
                        leider so, dass einige für den <strong>Rest ihres Lebens</strong> im Tierheim bleiben müssen, da
                        sie durch jahrelange, nicht artgerechte Haltung kaum noch zu sozialisieren sind.
                    </p>
                    <p>
                        Über jegliche Unterstützung des Tierheims ist der Vorstand sowie die MitarbeiterInnen, auch im
                        Namen der Tiere, sehr dankbar.
                    </p>
                </div>
                <img src={Leitung.src} alt="" />
                <p className="mt-6 text-sm ">
                    Umsetzung von{" "}
                    <a className="underline" href="https//www.sabocon.com">
                        Sabocon GmbH{" "}
                    </a>{" "}
                </p>
            </div>
        </MainContainer>
    );
};

export default TierheimContent;
