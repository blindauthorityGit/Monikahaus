export default function switcher(params) {
    switch (params) {
        case "#fff":
            return "bgWeiss";
        case "#DCDFDC":
            return "bgLightGreen";
        case "#000000":
            return "bgBlack";
        case "#EB4511":
            return "bgRed";
        default:
            return "bubu";
    }
}
