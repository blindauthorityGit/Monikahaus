// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");

// const path = require("path");
// const fs = require("fs");

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { body, email } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_USER,
            pass: process.env.NEXT_PASSWORD_DEV,
        },
    });

    try {
        const emailRes = transporter.sendMail({
            from: "suppenpeda@bubu.com",
            // to: "contacts@german-cosmetics.de",
            to: `${email}`,
            subject: `Ihre Spendenquittung`,
            replyTo: "suppenpeda@bubu.com",
            html: `<p><strong>Name:</strong> ${body}</p> `,
        });

        console.log("Message Sent", emailRes.messageId, process.env.NEXT_DEV);
        res.status(200).json(req.body);
    } catch (err) {
        console.log("GEHT NET", err);
    }

    // });

    console.log(req.body, "HALLO");
};
