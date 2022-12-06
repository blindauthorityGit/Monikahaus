import jsPDF from "jspdf";
import Template from "../../pdf/template";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import MainContainer from "../../layout/mainContainer";
import { BtnDirector, BtnDirectorFw } from "../../../functions/btnDirector";
import { Rings } from "react-loader-spinner";

const QuittungForm = (props) => {
    const reportTemplateRef = useRef(null);
    const [data, setData] = useState({});
    const [allData, setAllData] = useState(false);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const firstRef = useRef();
    const secondRef = useRef();
    const quittungRef = useRef();

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: "a4",
            unit: "px",
        });

        // Adding the fonts.
        doc.setFont("Inter-Regular", "normal");

        doc.setDrawColor(0, 0, 0);
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
                    console.log(data);
                } catch (error) {
                    console.error(`Could not get products: ${error}`);
                }
            },
        });
    };

    useEffect(() => {
        setData({ ...data, sum: props.sum });
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
        if (Object.keys(data).length == 5) {
            setAllData(true);
        }
        console.log(Object.keys(data).length);
    };

    async function submitter(data) {
        let config = {
            method: "post",
            url: `/api/quittung`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        console.log(data);
        try {
            const response = await axios(config);
            setLoading(false);
            setSuccess(true);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <MainContainer noGap={true} width="fixed relative h-full">
            <form ref={firstRef} className="col-span-12 grid col-span-12 gap-4 pt-12" action="">
                <div className="col-span-12 font-bold mb-6">Bitte füllen Sie folgende Daten aus:</div>

                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Vorname"
                    className="col-span-12 border p-2 block"
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Nachname"
                    className="col-span-12 border p-2 block"
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
                <input
                    type="text"
                    name="adresse"
                    id="adresse"
                    placeholder="Anschrift"
                    className="col-span-12 border p-2 block"
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
                <input
                    type="number"
                    name="sum"
                    id="sum"
                    className="hidden"
                    value={props.sum}
                    readOnly
                    onChange={(e) => {
                        onChange(e);
                    }}
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="col-span-12 border p-2 block"
                    onChange={(e) => {
                        onChange(e);
                    }}
                />

                <input
                    className={`${
                        allData ? "" : "opacity-30"
                    } col-span-12 mt-10 w-full cursor-pointer transition-all group ease-in-out duration-300 w-full  p-8 flex items-center justify-center bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                    onClick={(e) => {
                        e.preventDefault();
                        BtnDirectorFw(firstRef, secondRef);
                        console.log("bubu");
                        handleGeneratePdf();
                        quittungRef.current.classList.remove("hidden");
                    }}
                    disabled={allData ? false : true}
                    value="Weiter"
                    type="submit"
                />
            </form>
            <div ref={quittungRef} className=" col-span-12 hidden">
                <Template
                    ref={reportTemplateRef}
                    firstName={data.firstName}
                    lastName={data.lastName}
                    adresse={data.adresse}
                    betrag={data.sum}
                ></Template>
            </div>
            <div className="second col-span-12 grid grid-cols-12 gap-4 hidden pt-12" ref={secondRef}>
                <div className="col-span-12 font-bold mb-6">Bitte überprüfen Sie Ihre Daten:</div>
                <div className="col-span-4">Vorname:</div>
                <div className="col-span-8">{data.firstName}</div>
                <div className="col-span-4">Nachname:</div>
                <div className="col-span-8">{data.lastName}</div>
                <div className="col-span-4">Anschrift:</div>
                <div className="col-span-8">{data.adresse}</div>
                <div className="col-span-4">Summe:</div>
                <div className="col-span-8">EUR {data.sum},-</div>
                <div className="col-span-4">Email:</div>
                <div className="col-span-8">{data.email}</div>
                <input
                    className={` col-span-6 mt-10 w-full cursor-pointer transition-all group ease-in-out duration-300 w-full  p-8 flex items-center justify-center bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                    onClick={(e) => {
                        e.preventDefault();
                        BtnDirector(firstRef, secondRef);
                        quittungRef.current.classList.add("hidden");

                        console.log("bubu");
                    }}
                    disabled={allData ? false : true}
                    value="Zurück"
                    type="submit"
                />

                {loading ? (
                    <div className="col-span-6 pt-6 flex justify-center">
                        <Rings
                            height="80"
                            width="80"
                            color="#8c8264"
                            radius="6"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="rings-loading"
                        />
                    </div>
                ) : (
                    <input
                        className={` col-span-6 mt-10 w-full cursor-pointer transition-all group ease-in-out duration-300 w-full  p-8 flex items-center justify-center bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={(e) => {
                            e.preventDefault();
                            submitter(data);
                            console.log("bubu");
                            setLoading(true);
                        }}
                        value="Abschicken"
                        type="submit"
                    />
                )}
                {success ? <div className="text-primaryColor w-96 mt-4">Bite überprüfen Sie Ihr Postfach!</div> : ""}
            </div>
        </MainContainer>
    );
};
export default QuittungForm;
