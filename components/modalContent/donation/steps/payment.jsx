import React, { useEffect, useRef } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

import { motion } from "framer-motion";

//Typo
import { H1, H2, H3, P } from "../../../typography";

//Fcuntions
import uploadToDatabase from "../../../../functions/uploadToDatabase";

//Store
import useStore from "../../../../store/store";

//ASSET
import PinkGirl from "../../../../assets/pinkGirl.svg";

function Payment(props) {
    const userData = useStore((state) => state.userData);

    // USERLIST;
    const userList = useStore((state) => state.userList);
    const setUserList = useStore((state) => state.setUserList);
    //OVERLAY
    const setShowOverlay = useStore((state) => state.setShowOverlay);

    // SUCCESS
    const setShowSuccess = useStore((state) => state.setShowSuccess);
    // SUCCESS
    const setModalHeight = useStore((state) => state.setModalHeight);
    //UNCLAIMED
    const setShowUnclaimed = useStore((state) => state.setShowUnclaimed);
    const closeModal = useStore((state) => state.closeModal);

    const paypalButtonRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setModalHeight("100%");
        }
        return () => {
            if (window.innerWidth <= 768) {
                setModalHeight("47%");
            }
        };
    }, []);

    useEffect(() => {
        // Add the class when the component mounts
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.remove("overflow-hidden");
        modalContainer.classList.add("overflow-auto");

        // Remove the class when the component unmounts
        return () => {
            modalContainer.classList.remove("overflow-auto");

            modalContainer.classList.add("overflow-hidden");
        };
    }, []);

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 xl:mb-6 hidden lg:block">
                <H1>Schenken Sie Freude</H1>
                <P>Mit Ihrer Spende lassen wir die Wünsche unserer Kinder und Jugendlichen wahr werden. </P>
            </div>
            <motion.div
                className={`colors w-full col-span-12 grid grid-cols-12`}
                key="sum-choice" // Add a unique key to the motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ opacity: 1, x: 0, transition: { type: "spring", stiffness: 1000, damping: 80, delay: 0.1 } }}
                exit={{ x: -1000, opacity: 1 }}
            >
                <div className="col-span-12 xl:mb-6 lg:mt-6 sm:mb-4">
                    <H2>Wie möchten Sie bezahlen?</H2>
                    <p className="mb-4">
                        Ihre Spende:{" "}
                        <strong>
                            {userData.sum.toLocaleString("de-DE", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}{" "}
                            Euro{" "}
                        </strong>
                    </p>
                    {/* <P>
                        Ihre Spende hilft uns, den Alltag unserer Kinder und Jugendlichen schöner zu gestalten. Mit
                        welchem Betrag möchten Sie unsere Arbeit unterstützen?
                    </P> */}
                </div>

                <div className="lg:col-span-12 col-span-12 lg:pt-8">
                    <PayPalButtons
                        // ref={paypalButtonRef}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: Number(userData.sum), // value: document.querySelector("#sumWrapper").dataset.sum,
                                        },
                                        description: `Spende Weihnachten: ${userData.name}`,
                                    },
                                ],
                                application_context: {
                                    shipping_preference: "NO_SHIPPING", // Set shipping preference to NO_SHIPPING
                                },
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(async (details) => {
                                const data = details;
                                console.log("ES WIRD HOCHGELADEN");
                                uploadToDatabase(
                                    userData,
                                    setUserList,
                                    setShowOverlay,
                                    setShowSuccess,
                                    setShowUnclaimed,
                                    closeModal,
                                    userList
                                );
                            });
                        }}
                        disable-funding="eps"
                    />
                </div>
                {/* <div className="col-span-6 flex justify-center">
                    <img className="max-w-[70%]" src={PinkGirl.src} alt="" />
                </div> */}
            </motion.div>
        </div>
    );
}

export default Payment;
