const Template = () => {
    const styles = {
        page: {
            marginLeft: "5rem",
            marginRight: "5rem",
            "page-break-after": "always",
        },

        columnLayout: {
            display: "flex",
            justifyContent: "space-between",
            margin: "3rem 0 5rem 0",
            gap: "2rem",
        },

        column: {
            display: "flex",
            flexDirection: "column",
        },

        spacer2: {
            height: "2rem",
        },

        fullwidth: {
            width: "100%",
        },

        marginb0: {
            marginBottom: 0,
        },
    };
    return (
        <>
            <div className="top">Aussteller (Bezeichnung und Anschrift der steuerbegünstigten Einrichtung)</div>
            <div className="TH">
                <h3>
                    Tierheim Dreieich e.V.
                    <br />
                    Im Haag 3 <br />
                    63303 Dreieich
                </h3>
            </div>
        </>
    );
};

export default Template;
