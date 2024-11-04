// Step1.jsx
import React, { useState } from "react";
//TYPO
import { H1, H2, P } from "../../typography";
import { MainButton } from "../../buttons";

import SuccessKids from "../../../assets/successKidsSmall.svg";
import Logo from "../../../assets/logo.png";
import axios from "axios";

//STORE
import useStore from "../../../store/store"; // Import the zustand store

const Success = ({ onNext }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    //GLOBAL USERLIST STATE
    const userData = useStore((state) => state.userData);

    const handleSendEmail = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await axios.post("/api/quittung", {
                email: email,
                userData: userData,
            });

            setSuccessMessage("Die Spendenquittung wurde an die von Ihnen angegebene E-Mail-Adresse verschickt.");
        } catch (error) {
            setErrorMessage("Error sending email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <img className="max-w-[80%] h-auto m-auto" src={SuccessKids.src} alt="" />

            <div width=" grid grid-cols-12  h-full absolute top-0 left-0 w-full h-full overflow-y-auto">
                <div className="col-span-12 p-4 lg:pt-4 xl:pt-10 sm:pt-0 lg:p-10">
                    <H1 klasse="font-success text-primaryColor text-center">Vielen Dank für Ihre Unterstützung!</H1>
                    <div className="mb-6 xl:mb-8"></div>
                    {/* 
                    <P klasse="font-semibold text-center">Benötigen Sie eine Quittung?</P>
                    <div className="w-full flex flex-col items-center">
                        <form className="w-full flex flex-col items-center" onSubmit={handleSendEmail}>
                            <input
                                type="email"
                                placeholder="E-Mail-Adresse"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-sm px-3 py-2"
                                required
                            />
                            <div className="mt-4">
                                {loading ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-darkText"></div>
                                ) : (
                                    <>
                                        {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
                                        {successMessage && (
                                            <div className="text-green-500 text-xs">{successMessage}</div>
                                        )}
                                        {!errorMessage && !successMessage && (
                                            <button
                                                type="submit"
                                                className="bg-darkText rounded-sm font-semibold text-white text-sm px-4 py-2"
                                            >
                                                Quittung zuschicken
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </form>
                    </div> */}
                    <div className="mb-6 xl:mb-8"></div>
                    <P klasse="font-semibold text-center">Das Team des Familienzentrums Monikahaus</P>
                    <P klasse="font-semibold text-center">
                        <a href="https://www.skf-frankfurt.de/">www.monikahaus.de</a>{" "}
                    </P>{" "}
                    <div className="mb-6 xl:mb-66"></div>
                    <P klasse="text-center mb-6">
                        <strong>Bitte beachten:</strong> <br></br> Der Sozialdienst katholischer Frauen e. V.,
                        Ortsverein Frankfurt, ist als gemeinnützig vom Finanzamt Frankfurt am Main anerkannt. Ihre
                        Spende ist steuerlich abzugsfähig. Für den Spendennachweis genügt der Zahlungsbeleg, wenn die
                        Zuwendung den Betrag von 300 Euro nicht übersteigt.
                        <br /> Wenn Sie eine Spendenquittung benötigen, schreiben Sie uns bitte an <br />
                        <a href="mailto:spenden@skf-frankfurt.de">spenden@skf-frankfurt.de</a>.
                    </P>
                    {/* <img src={Logo.src} alt="" />
                    <div className="mb-4 xl:mb-66"></div> */}
                </div>
            </div>
        </>
    );
};

export default Success;
