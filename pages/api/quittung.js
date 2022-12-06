// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");

// const path = require("path");
// const fs = require("fs");

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { firstName, lastName, adresse, sum, pdf, email } = req.body;
    console.log(req.body);

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
            from: "invoice@xms-donate.de",
            // to: "contacts@german-cosmetics.de",
            // to: `office@atelierbuchner.at`,
            to: `${email}`,
            subject: `Ihre Spendenquittung`,
            replyTo: "noreply@xms-donate.de",
            html: `<p>Liebe/r ${firstName} ${lastName},</p>
            <p>vielen Dank für Ihre Spende an das Tierheim Dreieich!</p>
            <p>Ihre Quittung finden Sie im Anhang dieser Email.</p>
            <p><strong>Frohe Weihnachten!</strong></p>
            `,
            attachments: [
                {
                    filename: `${firstName}${lastName}.pdf`,
                    content: pdf,
                    contentType: "application/pdf",
                    encoding: "base64",
                },
            ],
        });

        console.log("Message Sent", emailRes.messageId, process.env.NEXT_DEV);
        res.status(200).json(req.body);
    } catch (err) {
        console.log("GEHT NET", err);
    }

    // });

    console.log(req.body, "HALLO");
};
