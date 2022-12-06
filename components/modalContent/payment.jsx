import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ButtonReal } from "../utils/buttonReal";
import checkForID from "../../functions/checkForID";
import { BtnDirector, BtnDirectorFw } from "../../functions/btnDirector";

function Payment(props) {
    return (
        <div ref={props.eightRef} className="eight hidden">
            <div className="font-bold mb-4 text-xl">Bezahlung</div>{" "}
            <div className="topLine mb-4 text-base italic ">
                Wählen Sie Ihre Bezahlart:
                <br />
            </div>
            <PayPalButtons
                createOrder={(data, actions) => {
                    console.log(window.localStorage.getItem("anon"));
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: Number(window.localStorage.getItem("spende")), // value: document.querySelector("#sumWrapper").dataset.sum,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    console.log(data);
                    return actions.order.capture().then((details) => {
                        const data = details;
                        console.log(details, details.payer, data, data.payer.name, data.payer.adress);
                        localStorage.setItem(`email`, data.payer.email_adress);
                        props.setIsPayed(true);
                        const newUser = {
                            anon: Boolean(window.localStorage.getItem("anon")),
                            color: window.localStorage.getItem("color"),
                            email: window.localStorage.getItem("email"),
                            name: window.localStorage.getItem("fullName"),
                            id: Number(window.localStorage.getItem("id")),
                            image: window.localStorage.getItem("image"),
                            sum: Number(window.localStorage.getItem("spende")),
                            winner: window.localStorage.getItem("winner"),
                            comment: window.localStorage.getItem("comment"),
                            claimed: true,
                        };
                        props.setUserList((current) => [...current, newUser]);
                        props.setShowThankYou(true); // dataDB(newUser.colo, newUser);
                        // console.log(newUser, userList);

                        props.push({
                            pathname: "/donate",
                            query: {
                                id: newUser.id,
                                name: newUser.name,
                                winner: newUser.winner,
                            },
                        });
                        props.setShowOverlay(false);
                        props.setShowUnclaimed(false);
                        {
                            window.localStorage.getItem("winner") == "true" ? props.setIsWinner(true) : null;
                        }
                    });
                }}
            />
            <div className="grid grid-cols-2 mt-10 w-full gap-4">
                <div className={`w-full `}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={false}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            BtnDirector(props.seventhRef, props.eightRef);
                        }}
                    >
                        Zurück
                    </ButtonReal>
                </div>
            </div>
        </div>
    );
}

export default Payment;
