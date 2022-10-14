import Baum from "../assets/baum.svg";

const colors = {
    background: "#7d866f",
    primaryColor: "#7d866f",
    kugeln: [
        {
            kugel1: "#EB4511",
        },
        {
            kugel2: "#DCDFDC",
        },
        {
            kugel3: "#000000",
        },
        {
            kugel4: "#fff",
        },
    ],
    baum: "#04151F",
};

const startInfo = {
    headline: "Schmücken Sie den Baum!",
    subline: "Lorem ipsum dolor sit amet delurum omes bubu",
    buttonText: "Jetzt spenden",
};

const anzahlRows = 10;

const Tree = () => {
    return Baum;
};

export { colors, Tree, anzahlRows, startInfo };
