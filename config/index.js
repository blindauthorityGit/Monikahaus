import Baum from "../assets/baum.svg";

const colors = {
    background: "#fff",
    primaryColor: "#7d866f",
    bgColors: ["#EB4511", "#DCDFDC", "#000000", "#fff"],
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

const anzahlRows = 14;

const Tree = () => {
    return Baum;
};

const showGoal = true;
const goalSum = 1000;

export { colors, Tree, anzahlRows, startInfo, goalSum, showGoal };
