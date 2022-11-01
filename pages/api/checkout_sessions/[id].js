import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const id = req.query.id;

    try {
        if (!id.startsWith("cs")) {
            throw Error("Incorrect Checkout Session ID");
        }
        const checkout_session = await stripe.checkout.session.retrieve(id);
        res.status(200).json(checkout_session);
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
}
