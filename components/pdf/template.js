import Unterschrift from "./unterschrift.png";

import { forwardRef } from "react";

const Template = (props, ref) => {
    return (
        <div className="col-span-12" style={{ padding: "24px", fontSize: "6px" }} ref={ref}>
            <div className="top">Aussteller (Bezeichnung und Anschrift der steuerbegünstigten Einrichtung)</div>
            <div className="TH" style={{ margin: "12px 0" }}>
                <h3 style={{ fontSize: "10px", color: "black", fontWeight: "bold" }}>
                    Tierheim Dreieich e.V.
                    <br />
                    Im Haag 3 <br />
                    63303 Dreieich
                </h3>
            </div>
            <div className="best">
                <h2 style={{ fontSize: "8px", color: "black", fontWeight: "bold" }}>
                    Bestätigung über Geldzuwendungen
                </h2>
                <p>
                    Im Sinne des § 10b des Einkommensteuergesetzes an eine der in § 5 Abs. 1 Nr. 9 des
                    Körperschaftsteuergesetzes bezeichneten <br /> Körperschaften, Personenvereinigungen oder
                    Vermögensmassen
                </p>
            </div>
            <div className="name" style={{ marginTop: "6px" }}>
                <p>Name und Anschrift des Zuwendenden:</p>
                <div className="fullName flex" style={{ marginTop: "6px" }}>
                    <div className="firstName">{props.firstName}</div>
                    <div className="lastNameName pl-1">{props.lastName}</div>
                </div>
                <div className="adresse">{props.adresse}</div>
            </div>
            <div className="betrag" style={{ marginTop: "6px" }}>
                Betrag der Zuwendungen in Ziffern: <br />€ {props.betrag},-
            </div>
            <div className="texte" style={{ marginTop: "6px" }}>
                <p>
                    Es handelt sich um den Verzicht auf Erstattung von Aufwendungen{" "}
                    <span>
                        <input id="ja" name="ja" type="checkbox" />
                        <label htmlFor="ja">Ja</label>
                    </span>{" "}
                    <span>
                        <input id="nein" name="nein" checked type="checkbox" />
                        <label htmlFor="nein">Nein</label>
                    </span>{" "}
                </p>
                <div className="eins" style={{ marginTop: "6px" }}>
                    <span>
                        <input type="checkbox" checked name="eins" id="eins" />
                    </span>
                    <label htmlFor="nein">
                        {" "}
                        Wir sind wegen Förderung nach dem Freistellungsbescheid bzw. nach der Anlage zum
                        Körperschaftsteuerbescheid des <br></br> Finanzamtes, StNr., vom 04.02.2022 für den letzten{" "}
                        <br></br>
                        Veranlagungszeitrum 2018 bis 2020 nach § 5 Abs. 1 Nr. 9 des <br></br> Körperschaftsteuergesetzes
                        von der Körperschaftsteuerund nach § 3 Nr. 6 des Gewerbesteuergesetzes von der Gewerbesteuer
                        befreit.
                    </label>
                </div>
                <div className="zwei" style={{ marginTop: "6px" }}>
                    <span>
                        <input type="checkbox" checked name="zwei" id="zwei" />
                    </span>
                    <label htmlFor="zwei">
                        Die Einhaltung der satzungsgemäßen Voraussetzungen nach den §§ 51, 59, 60 und 61 AO wurde vom
                        Finanzamt Langen,<br></br> StNr. 28 250 51230 mit Bescheid vom 16.12.2014 nach <br></br> § 60a
                        AO gesondert festgestellt. Wir fördern nach unserer Satzung den Tierschutz.
                    </label>
                </div>
                <div className="text border" style={{ marginTop: "6px", padding: "10px" }}>
                    Es wird bestätigt, dass die Zuwendung nur zur Förderung verwendet wird.
                    <p>
                        Es wird bestätigt, dass über die in der Gesamtsumme enthaltenen Zuwendungen keine weiteren
                        Bestätigungen, weder formelle <br></br> Zuwendungsbestätigungen noch Beitragsquittungen oder
                        ähnliches ausgestellt wurden und werden.
                    </p>
                    <p className="strong">
                        Nur für steuerbegünstigte Einrichtungen, bei denen die Mitgliedsbeiträge steuerlich nicht
                        abziehbar sind:
                    </p>
                    <p>
                        Es wird bestätigt, dass es sich nicht um einen Mitgliedsbeitrag handelt, <br></br> dessen Abzug
                        nach § 10b Abs. 1 des Einkommensteuergesetzes ausgeschlossen ist.
                    </p>
                </div>
                <div className="unterschrift" style={{ marginTop: "6px" }}>
                    <div className="datum font-bold">{new Date().toString().split(" ").splice(1, 3).join(" ")}</div>
                    {/* <img width="200" src={Unterschrift.src} alt="" /> */}

                    <img className="mt-3" width="200" src={Unterschrift.src} alt="" />
                </div>
                <div className="hinweis" style={{ fontSize: "4px", marginTop: "6px" }}>
                    <p className="strong">Hinweis:</p>
                    <p>
                        Wer vorsätzlich oder grob fahrlässig eine unrichtige Zuwendungsbestätigung erstellt oder
                        veranlasst, dass Zuwendungen nicht zu den in der Zuwendungsbestätigung angegebenen<br></br>
                        steuerbegünstigten Zwecken verwendet werden, haftet für die entgangene Steuer (§ 10b Abs. 4
                        EStG, § 9 Abs. 3 KStG, § 9 Nr. 5 GewStG).
                    </p>
                    <p>
                        Diese Bestätigung wird nicht als Nachweis für die steuerliche Berücksichtigung der Zuwendung
                        anerkannt, wenn das Datum des Freistellungsbescheides länger als 5 Jahre bzw. das Datum der
                        <br></br>
                        Feststellung der Einhaltung der satzungsmäßigen Voraussetzungen nach § 60a Abs. 1 AO länger als
                        3 Jahre seit Ausstellung des Bescheides zurückliegt (§ 63 Abs. 5 AO).
                    </p>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(Template);
