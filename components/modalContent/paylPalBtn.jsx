import { PayPalButtons } from "@paypal/react-paypal-js";

function PaypalBtn(props) {
    return (
        <PayPalButtons
            createOrder={(data, actions) => {
                console.log(props.donateData);
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: document.querySelector("#sumWrapper").dataset.sum,
                            },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
                console.log(data);
                return actions.order.capture().then((details) => {
                    console.log(details);
                    props.setIsPayed(true);
                    const name = details.payer.name.given_name;
                    console.log(props.userData);
                });
            }}
        />
    );
}

export default PaypalBtn;
