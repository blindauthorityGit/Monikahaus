import React from "react";
import LogoWhite from "../../assets/logo_white.svg";
import TierheimLogo from "../../assets/tierheimLogo.svg";
import MainContainer from "../layout/mainContainer";
import Link from "next/link";

const MenuContent = () => {
    return (
        <MainContainer noGap width="fixed relative h-full">
            <div className="col-span-12 pt-10 sm:pt-0 text-center">
                <div className="w-full flex justify-center">
                    <img className="w-64" src={LogoWhite.src} alt="Logo" />
                </div>
                <ul className="text-white text-xl mt-16">
                    <li className="mb-4">
                        <Link href="/impressum">
                            <a>Impressum</a>
                        </Link>
                    </li>
                    <li className="mb-4">
                        {" "}
                        <Link href="/datenschutz" target="_blank" rel="noreferrer">
                            <a>Datenschutz</a>
                        </Link>
                    </li>
                    <li className="mb-4">
                        {" "}
                        <Link href="https://tierheim-dreieich.de/" target="_blank" rel="noreferrer">
                            <a>Tierheim Dreieich</a>
                        </Link>
                    </li>
                    <li className="mb-4">
                        {" "}
                        <Link href="https://zahnarztpraxisdreieich.de/" target="_blank" rel="noreferrer">
                            <a>Zahnarztpraxis</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </MainContainer>
    );
};

export default MenuContent;
