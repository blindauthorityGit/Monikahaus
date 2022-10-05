import { colors } from "../config";

export default function Data() {
    const testData = [
        {
            id: 2,
            claimed: true,
            name: "Johannes Buchner",
            sum: 15,
            color: colors.kugeln[0].kugel1,
        },
        {
            id: 10,
            claimed: true,
            name: "Sandra Löbl",
            sum: 55,
            color: colors.kugeln[1].kugel2,
        },
        {
            id: 13,
            claimed: true,
            name: "Marc Werner",
            sum: 35,
            color: colors.kugeln[2].kugel3,
        },
    ];
    return testData;
}
