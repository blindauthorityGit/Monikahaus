import jsPDF from "jspdf";
import Template from "../components/pdf/template";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Test = (props) => {
    const reportTemplateRef = useRef(null);
    const [data, setData] = useState({});

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: "a4",
            unit: "px",
        });

        // Adding the fonts.
        doc.setFont("Inter-Regular", "normal");

        doc.setDrawColor(0, 0, 0);
        doc.text("BUBUBUBUBU", 30, 30, { maxWidth: 200, align: "justify" });
        doc.internal.write(0, "Tw"); // <- add this

        doc.html(reportTemplateRef.current, {
            async callback(doc) {
                // await doc.save(props.docName);
                // await doc.output("datauristring");
                // const res = await doc.output("datauristring");

                // setData({ ...data, pdf: res.split("base64,")[1] });

                try {
                    await doc.output("datauristring");
                    setData({ ...data, pdf: await doc.output("datauristring").split("base64,")[1] });
                } catch (error) {
                    console.error(`Could not get products: ${error}`);
                }
            },
        });
    };

    useEffect(() => {
        handleGeneratePdf();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };

    async function submitter(data) {
        // const pdfData = handleGeneratePdf();
        // console.log(pdfData);
        // setTimeout(() => {
        //     console.log(data);
        // }, 2000);

        let config = {
            method: "post",
            // url: `http://localhost:3000/api/contact`,
            url: `/api/quittung`,
            // url: `/api/quittung`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        console.log(data);
        try {
            const response = await axios(config);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <button className="button" onClick={handleGeneratePdf}>
                Generate PDF
            </button>
            <form action="">
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
                <input
                    type="text"
                    name="adresse"
                    id="adresse"
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
                <input
                    type="number"
                    name="sum"
                    id="sum"
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
                <input
                    onClick={(e) => {
                        e.preventDefault();
                        submitter(data);
                    }}
                    type="submit"
                />
                <input
                    onClick={(e) => {
                        e.preventDefault();
                        handleGeneratePdf();
                    }}
                    type="submit"
                />
            </form>
            <div>
                <Template
                    ref={reportTemplateRef}
                    firstName={data.firstname}
                    lastName={data.lastName}
                    adresse={data.adresse}
                    betrag={data.sum}
                />
            </div>
        </div>
    );
};

export default Test;
