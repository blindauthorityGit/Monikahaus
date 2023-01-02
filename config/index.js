import Baum from "../assets/baum.svg";

const colors = {
    background: "#fff",
    primaryColor: "#7d866f",
    bgColors: ["rgb(235, 69, 17)", "rgb(220, 223, 220)", "rgb(0, 0, 0)", "rgb(255, 255, 255)"],
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

const bgColors = ["#033F63", "#AF4D98", "#FF4A1C", "#CC3363", "#0197F6"];

const startInfo = {
    headline: "Vielen Dank an alle Spender!",
    subline: "Lorem ipsum dolor sit amet delurum omes bubu",
    buttonText: "Jetzt spenden",
};

const anzahlRows = 14;
const anzahlBaumKugeln = 75;

const Tree = () => {
    return Baum;
};

const showGoal = false;
const goalSum = 1000;

// IMAGES
const maxSize = 1; // in MB

const dev = false;
const local = false;

export { colors, Tree, anzahlRows, startInfo, goalSum, showGoal, dev, anzahlBaumKugeln, local, maxSize, bgColors };
