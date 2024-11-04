import React from "react";
//TYPO
import { H2, P } from "../../typography";

import Logo from "../../../assets/logoFull.svg";

const Info = () => {
    return (
        <div width=" grid grid-cols-12 relative h-full bg-white">
            <div className="col-span-12 p-4 lg:pt-4 xl:pt-10 sm:pt-4  lg:p-10 bg-white">
                <H2>
                    Das Familienzentrum
                    <br /> Monikahaus
                </H2>
                <div className="mb-6 xl:mb-8"></div>
                <P>
                    In unserem Familienzentrum Monikahaus bieten wir unter einem Dach vielfältige, integrierte und
                    miteinander vernetzte Hilfen für Familien an. Jeder Ratsuchende erhält so eine bedarfsorientierte
                    und passgenaue Unterstützung. „Schritt für Schritt &mdash; Hand in Hand“ auf der Grundlage einer
                    vertrauensvollen Beziehung begleiten wir Familien in ihrem Leben.
                </P>
                <div className="mb-4 xl:mb-66"></div>
                <P>
                    Der Sozialdienst katholischer Frauen e.V., Ortsverein Frankfurt am Main, wurde 1901 gegründet. Wir,
                    die hauptberuflichen und ehrenamtlichen Mitarbeiter:innen, haben es uns zur Aufgabe gemacht,
                    Menschen gleich welcher Religion oder Herkunft in schwierigen Lebenslagen zu helfen.
                </P>
                <div className="mb-4 xl:mb-66"></div>
                <P>Der Sozialdienst katholischer Frauen ist anerkannter Fachverband im Deutschen Caritasverband.</P>
                <div className="mb-4 xl:mb-66"></div>
                <P>
                    <span className="font-bold">Sozialdienst katholischer Frauen e.V.</span>
                    <br />
                    Ortsverein Frankfurt am Main<br></br>
                    Kriegkstraße 32–36<br></br>
                    60326 Frankfurt am Main
                    <br></br>
                    <br></br>
                    <a
                        className="font-semibold underline hover:opacity-70"
                        href="https://www.skf-frankfurt.de/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        www.monikahaus.de
                    </a>
                    <br></br>
                    <a className="font-semibold underline hover:opacity-70" href="mailto:spenden@skf-frankfurt.de">
                        spenden@skf-frankfurt.de
                    </a>
                </P>
                <div className="mb-4 xl:mb-66"></div>
                <P>
                    <span className="font-bold">Bankverbindung</span>
                    <br />
                    Sozialdienst katholischer Frauen e.V. Ortsverein Frankfurt<br></br>
                    Frankfurter Volksbank<br></br>
                    IBAN: DE10 5019 0000 6000 0225 41
                    <br />
                    BIC: FFVBDEFF
                </P>
                <div className="mb-4 xl:mb-66"></div>
                <P>
                    <span className="font-bold">Design & Umsetzung</span>
                    <br />
                    <a
                        className="font-semibold underline hover:opacity-70"
                        href="https://www.sabocon.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Sabocon GmbH
                    </a>
                </P>
                <img src={Logo.src} className="mt-6" alt="" />
            </div>
        </div>
    );
};

export default Info;
