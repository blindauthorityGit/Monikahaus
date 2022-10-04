// /** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            screens: {
                sm: "100%",
                md: "100%",
                lg: "1024px",
                xl: "1280px",
            },
        },
        extend: {
            colors: {
                primaryColor: "#8E8162",
                secondaryColor: "#bab298",
                darkPurple: "#71664D",
                overlay: "#A54399",
                pink: "#e41aff",
                rosa: "#d77bbf",
                // footer: "#526576",
                footer: "#1d1e1e",
                text: "#414646",
                lightGray: "#F5F0ED",
            },
            fontFamily: {
                ...fontFamily,
                sans: ["Montserrat", "sans-serif"],
                europa: ["europa", "sans-serif"],
            },
        },
    },
    plugins: [],
};
