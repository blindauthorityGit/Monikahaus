function switcher(params) {
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
function switcherRGB(params) {
    switch (params) {
        case "rgb(255, 255, 255)":
            return "bgWeiss";
        case "rgb(220, 223, 220)":
            return "bgLightGreen";
        case "rgb(0, 0, 0)":
            return "bgBlack";
        case "rgb(235, 69, 17)":
            return "bgRed";
        default:
            return "bubu";
    }
}

export { switcher, switcherRGB };
