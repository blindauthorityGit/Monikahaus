import React from "react";
//TYPO
import { H2, H3, P } from "../../typography";

import Logo from "../../../assets/logoFull.svg";

const Info = () => {
    return (
        <div width=" grid grid-cols-12 relative h-full bg-white">
            <div className="col-span-12 p-4 lg:pt-4 xl:pt-10 sm:pt-4  lg:p-10 bg-white">
                <H2>Datenschutzerklärung</H2>
                <strong>Allgemeiner Hinweis und Pflichtinformationen</strong>
                <div className="mb-6 xl:mb-8"></div>
                <strong className="mb-4">Benennung der verantwortlichen Stelle</strong>
                <P>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</P>
                <br />
                <P>
                    <span id="s3-t-firma">Sozialdienst katholischer Frauen e.V.</span>
                    <br />
                    {/* <span id="s3-t-ansprechpartner">Marc Werner</span>
                    <br /> */}
                    <span id="s3-t-strasse">Kriegkstraße 32–36</span>
                    <br />
                    <span id="s3-t-plz">60326</span> <span id="s3-t-ort">Frankfurt am Main</span>
                </P>
                <P>
                    Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel
                    der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o.Ä.).
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Widerruf Ihrer Einwilligung zur Datenverarbeitung</strong>
                <P>
                    Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. Ein
                    Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine
                    formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung
                    bleibt vom Widerruf unberührt.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde</strong>
                <P>
                    Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei
                    der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher
                    Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres
                    Unternehmens befindet. Der folgende Link stellt eine Liste der Datenschutzbeauftragten sowie deren
                    Kontaktdaten bereit:{" "}
                    <a
                        href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html
                    </a>
                    .
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Recht auf Datenübertragbarkeit</strong>
                <P>
                    Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
                    Vertrags automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die Bereitstellung
                    erfolgt in einem maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen
                    anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Recht auf Auskunft, Berichtigung, Sperrung, Löschung</strong>
                <P>
                    Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche
                    Auskunft über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren Empfänger und
                    den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser
                    Daten. Diesbezüglich und auch zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich
                    jederzeit über die im Impressum aufgeführten Kontaktmöglichkeiten an uns wenden.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>SSL- bzw. TLS-Verschlüsselung</strong>
                <P>
                    Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als
                    Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten,
                    die Sie über diese Website übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine verschlüsselte
                    Verbindung an der „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der Browserzeile.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <h2>Server-Log-Dateien</h2>
                <P>
                    In Server-Log-Dateien erhebt und speichert der Provider der Website automatisch Informationen, die
                    Ihr Browser automatisch an uns übermittelt. Dies sind:
                </P>
                <ul>
                    <li>
                        <P>Besuchte Seite auf unserer Domain</P>
                    </li>
                    <li>
                        <P>Datum und Uhrzeit der Serveranfrage</P>
                    </li>
                    <li>
                        <P>Browsertyp und Browserversion</P>
                    </li>
                    <li>
                        <P>Verwendetes Betriebssystem</P>
                    </li>
                    <li>
                        <P>Referrer URL</P>
                    </li>
                    <li>
                        <P>Hostname des zugreifenden Rechners</P>
                    </li>
                    <li>
                        <P>IP-Adresse</P>
                    </li>
                </ul>
                <P>
                    Es findet keine Zusammenführung dieser Daten mit anderen Datenquellen statt. Grundlage der
                    Datenverarbeitung bildet Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung
                    eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <h2>Cookies</h2>
                <P>
                    Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät
                    speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu
                    machen.
                </P>
                <P>
                    Einige Cookies sind “Session-Cookies.” Solche Cookies werden nach Ende Ihrer Browser-Sitzung von
                    selbst gelöscht. Hingegen bleiben andere Cookies auf Ihrem Endgerät bestehen, bis Sie diese selbst
                    löschen. Solche Cookies helfen uns, Sie bei Rückkehr auf unserer Website wiederzuerkennen.
                </P>
                <P>
                    Mit einem modernen Webbrowser können Sie das Setzen von Cookies überwachen, einschränken oder
                    unterbinden. Viele Webbrowser lassen sich so konfigurieren, dass Cookies mit dem Schließen des
                    Programms von selbst gelöscht werden. Die Deaktivierung von Cookies kann eine eingeschränkte
                    Funktionalität unserer Website zur Folge haben.
                </P>
                <P>
                    Das Setzen von Cookies, die zur Ausübung elektronischer Kommunikationsvorgänge oder der
                    Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B. Warenkorb) notwendig sind, erfolgt
                    auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Als Betreiber dieser Website haben wir ein
                    berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und reibungslosen
                    Bereitstellung unserer Dienste. Sofern die Setzung anderer Cookies (z.B. für Analyse-Funktionen)
                    erfolgt, werden diese in dieser Datenschutzerklärung separat behandelt.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <h2>Google CDN</h2>
                <strong>Art und Umfang der Verarbeitung</strong>
                <P>
                    Wir verwenden zur ordnungsgemäßen Bereitstellung der Inhalte unserer Website Google CDN. Google CDN
                    ist ein Dienst der Google Ireland Limited, welcher auf unserer Website als Content Delivery Network
                    (CDN) fungiert.
                </P>
                <P>
                    Ein CDN trägt dazu bei, Inhalte unseres Onlineangebotes, insbesondere Dateien wie Grafiken oder
                    Skripte, mit Hilfe regional oder international verteilter Server schneller bereitzustellen. Wenn Sie
                    auf diese Inhalte zugreifen, stellen Sie eine Verbindung zu Servern der Google Ireland Limited,
                    Gordon House, Barrow Street, Dublin 4, Irland her, wobei Ihre IP-Adresse und ggf. Browserdaten wie
                    Ihr User-Agent übermittelt werden. Diese Daten werden ausschließlich zu den oben genannten Zwecken
                    und zur Aufrechterhaltung der Sicherheit und Funktionalität von Google CDN verarbeitet.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Zweck und Rechtsgrundlage</strong>
                <P>
                    Die Nutzung des Content Delivery Networks erfolgt auf Grundlage unserer berechtigten Interessen,
                    d.h. Interesse an einer sicheren und effizienten Bereitstellung sowie der Optimierung unseres
                    Onlineangebotes gemäß Art. 6 Abs. 1 lit. f. DSGVO.
                </P>
                <P>
                    Wir beabsichtigen personenbezogenen Daten an Drittländer außerhalb des Europäischen
                    Wirtschaftsraums, insbesondere die USA, zu übermitteln. In Fällen, in denen kein
                    Angemessenheitsbeschluss der Europäischen Kommission existiert (z.B. in den USA) haben wir mit den
                    Empfängern der Daten anderweitige geeignete Garantien im Sinne der Art. 44 ff. DSGVO vereinbart.
                    Dies sind – sofern nicht anders angegeben – Standardvertragsklauseln der EU-Kommission gemäß
                    Durchführungsbeschluss (EU) 2021/914 vom 4. Juni 2021. Eine Kopie dieser Standardvertragsklauseln
                    können Sie unter{" "}
                    <a href="https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32021D0914&from=DE">
                        https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32021D0914&from=DE
                    </a>{" "}
                    einsehen.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Speicherdauer</strong>
                <P>
                    Die konkrete Speicherdauer der verarbeiteten Daten ist nicht durch uns beeinflussbar, sondern wird
                    von Google Ireland Limited bestimmt. Weitere Hinweise finden Sie in der Datenschutzerklärung für
                    Google CDN: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <h2>Google Analytics</h2>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Art und Umfang der Verarbeitung</strong>
                <P>
                    Wir verwenden Google Analytics von Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
                    Irland, als Analysedienst zur statistischen Auswertung unseres Onlineangebotes. Diese umfasst
                    beispielsweise die Anzahl der Aufrufe unseres Onlineangebotes, besuchte Unterseiten und die
                    Verweildauer von Besuchern. Google Analytics nutzt Cookies und weitere Browser-Technologien, um
                    Nutzerverhalten auszuwerten und Nutzer wiederzuerkennen. Diese Informationen werden unter anderem
                    genutzt, um Berichte über die Aktivität der Website zusammenzustellen.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Zweck und Rechtsgrundlage</strong>
                <P>
                    Der Einsatz von Google Analytics erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit.
                    a. DSGVO und § 25 Abs. 1 TTDSG.
                </P>
                <P>
                    Wir beabsichtigen personenbezogenen Daten an Drittländer außerhalb des Europäischen
                    Wirtschaftsraums, insbesondere die USA, zu übermitteln. In Fällen, in denen kein
                    Angemessenheitsbeschluss der Europäischen Kommission existiert (z.B. in den USA) haben wir mit den
                    Empfängern der Daten anderweitige geeignete Garantien im Sinne der Art. 44 ff. DSGVO vereinbart.
                    Dies sind – sofern nicht anders angegeben – Standardvertragsklauseln der EU-Kommission gemäß
                    Durchführungsbeschluss (EU) 2021/914 vom 4. Juni 2021. Eine Kopie dieser Standardvertragsklauseln
                    können Sie unter{" "}
                    <a href="https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32021D0914&from=DE">
                        https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32021D0914&from=DE
                    </a>{" "}
                    einsehen.
                </P>
                <P>
                    Zudem holen wir vor einem solchen Drittlandtransfer Ihre Einwilligung nach Art. 49 Abs. 1 Satz 1
                    lit. a. DSGVO ein, die Sie über die Einwilligung im Consent Manager (oder sonstigen Formularen,
                    Registrierungen etc.) erteilen. Wir weisen Sie darauf hin, dass bei Drittlandübermittlungen im
                    Detail unbekannte Risiken (z.B. die Datenverarbeitung durch Sicherheitsbehörden des Drittlandes,
                    deren genauer Umfang und deren Folgen für Sie wir nicht kennen, auf die wir keinen Einfluss haben
                    und von denen Sie unter Umständen keine Kenntnis erlangen) bestehen können.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Speicherdauer</strong>
                <P>
                    Die konkrete Speicherdauer der verarbeiteten Daten ist nicht durch uns beeinflussbar, sondern wird
                    von Google Ireland Limited bestimmt. Weitere Hinweise finden Sie in der Datenschutzerklärung für
                    Google Analytics:{" "}
                    <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <h2>PayPal</h2>
                <P>
                    Unsere Website ermöglicht die Bezahlung via PayPal. Anbieter des Bezahldienstes ist die PayPal
                    (Europe) S.à.r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg.
                </P>
                <P>
                    Wenn Sie mit PayPal bezahlen, erfolgt eine Übermittlung der von Ihnen eingegebenen Zahlungsdaten an
                    PayPal.
                </P>
                <P>
                    Die Übermittlung Ihrer Daten an PayPal erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO
                    (Einwilligung) und Art. 6 Abs. 1 lit. b DSGVO (Verarbeitung zur Erfüllung eines Vertrags). Ein
                    Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. In der Vergangenheit liegende
                    Datenverarbeitungsvorgänge bleiben bei einem Widerruf wirksam.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <h2>Sofortüberweisung</h2>
                <P>
                    Unsere Website ermöglicht die Bezahlung via “Sofortüberweisung.” Anbieter des Bezahldienstes ist die
                    Sofort GmbH, Theresienhöhe 12, 80339 München.
                </P>
                <P>
                    Mit Hilfe des Verfahrens “Sofortüberweisung” erhalten wir in Echtzeit eine Zahlungsbestätigung von
                    der Sofort GmbH und können unverzüglich mit der Erfüllung unserer Verbindlichkeiten beginnen.
                </P>
                <P>
                    Beim Bezahlen per “Sofortüberweisung” erfolgt eine Übermittlung Ihrer PIN und TAN an die Sofort
                    GmbH. Der Bezahlanbieter loggt sich damit in Ihr Online-Banking-Konto ein, überprüft automatisch
                    Ihren Kontostand und nimmt die Überweisung vor. Es folgt eine unverzügliche Transaktionsbestätigung.
                    Ihre Umsätze, der Kreditrahmen Ihres Dispokredits und die Existenz anderer Konten sowie deren
                    Bestände werden nach dem Einloggen ebenfalls automatisiert geprüft.
                </P>
                <P>
                    Neben PIN und TAN umfasst die Übermittlung an die Sofort GmbH außerdem Zahlungsdaten sowie Daten zu
                    Ihrer Person. Die Daten zu Ihrer Person umfassen Vor- und Nachname, Adresse, Telefonnummer(n),
                    Email-Adresse, IP-Adresse und ggf. weitere für die Zahlungsabwicklung notwendige Daten. Es besteht
                    eine Notwendigkeit dieser Datenübermittlung, um Ihre Identität zweifelsfrei festzustellen und
                    Betrugsversuchen vorzubeugen.
                </P>
                <P>
                    Die Übermittlung Ihrer Daten an die Sofort GmbH erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO
                    (Einwilligung) und Art. 6 Abs. 1 lit. b DSGVO (Verarbeitung zur Erfüllung eines Vertrags). Ein
                    Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. In der Vergangenheit liegende
                    Datenverarbeitungsvorgänge bleiben bei einem Widerruf wirksam.
                </P>
                <P>
                    Einzelheiten zur Zahlung mit Sofortüberweisung finden Sie unter:{" "}
                    <a href="https://www.sofort.de/datenschutz.html">https://www.sofort.de/datenschutz.html</a> und{" "}
                    <a href="https://www.klarna.com/sofort/">https://www.klarna.com/sofort/</a>.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <h2>Google Web Fonts</h2>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Art und Umfang der Verarbeitung</strong>
                <P>
                    Wir verwenden Google Fonts von Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
                    Irland, als Dienst zur Bereitstellung von Schriftarten für unser Onlineangebot. Um diese
                    Schriftarten zu beziehen, stellen Sie eine Verbindung zu Servern von Google Ireland Limited her,
                    wobei Ihre IP-Adresse übertragen wird.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Zweck und Rechtsgrundlage</strong>
                <P>
                    Der Einsatz von Google Fonts erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a.
                    DSGVO und § 25 Abs. 1 TTDSG.
                </P>
                <P>
                    Wir beabsichtigen personenbezogenen Daten an Drittländer außerhalb des Europäischen
                    Wirtschaftsraums, insbesondere die USA, zu übermitteln. In Fällen, in denen kein
                    Angemessenheitsbeschluss der Europäischen Kommission existiert (z.B. in den USA) haben wir mit den
                    Empfängern der Daten anderweitige geeignete Garantien im Sinne der Art. 44 ff. DSGVO vereinbart.
                    Dies sind – sofern nicht anders angegeben – Standardvertragsklauseln der EU-Kommission gemäß
                    Durchführungsbeschluss (EU) 2021/914 vom 4. Juni 2021. Eine Kopie dieser Standardvertragsklauseln
                    können Sie unter{" "}
                    <a href="https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32021D0914&from=DE">
                        https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32021D0914&from=DE
                    </a>{" "}
                    einsehen.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Speicherdauer</strong>
                <P>
                    Die konkrete Speicherdauer der verarbeiteten Daten ist nicht durch uns beeinflussbar, sondern wird
                    von Google Ireland Limited bestimmt. Weitere Hinweise finden Sie in der Datenschutzerklärung für
                    Google Fonts: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <h2>Font Awesome</h2>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Art und Umfang der Verarbeitung</strong>
                <P>
                    Wir verwenden Icons von Font Awesome, einem Dienst der Fonticons, Inc., 6 Porter Road, Apartment 3R,
                    Cambridge, MA 02140, USA. Bei Aufruf unserer Website lädt Ihr Browser die benötigten Icons in Ihren
                    Browsercache, um sie korrekt anzeigen zu können.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Zweck und Rechtsgrundlage</strong>
                <P>
                    Der Einsatz von Font Awesome erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a.
                    DSGVO und § 25 Abs. 1 TTDSG.
                </P>
                <P>
                    Wir beabsichtigen personenbezogenen Daten an Drittländer außerhalb des Europäischen
                    Wirtschaftsraums, insbesondere die USA, zu übermitteln. In Fällen, in denen kein
                    Angemessenheitsbeschluss der Europäischen Kommission existiert (z.B. in den USA) haben wir mit den
                    Empfängern der Daten anderweitige geeignete Garantien im Sinne der Art. 44 ff. DSGVO vereinbart.
                    Dies sind – sofern nicht anders angegeben – Standardvertragsklauseln der EU-Kommission gemäß
                    Durchführungsbeschluss (EU) 2021/914 vom 4. Juni 2021. Eine Kopie dieser Standardvertragsklauseln
                    können Sie unter{" "}
                    <a href="https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32021D0914&from=DE">
                        https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32021D0914&from=DE
                    </a>{" "}
                    einsehen.
                </P>
                <div className="mb-6 xl:mb-8"></div>
                <strong>Speicherdauer</strong>
                <P>
                    Die konkrete Speicherdauer der verarbeiteten Daten ist nicht durch uns beeinflussbar, sondern wird
                    von Fonticons, Inc. bestimmt. Weitere Informationen finden Sie in der Datenschutzerklärung von Font
                    Awesome: <a href="https://fontawesome.com/privacy">https://fontawesome.com/privacy</a>.
                </P>
                <div className="mb-6 xl:mb-8"></div>

                <img src={Logo.src} className="mt-6" alt="" />
            </div>
        </div>
    );
};

export default Info;
