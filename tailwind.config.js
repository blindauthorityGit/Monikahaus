// /** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
    // mode: "jit",
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
                primaryColor: "#7d866f",
                primaryColorDark: "#4e5346",
                secondaryColor: "#bab298",
                darkPurple: "#71664D",
                overlay: "#A54399",
                pink: "#e41aff",
                rosa: "#d77bbf",
                // footer: "#526576",
                footer: "#1d1e1e",
                text: "#414646",
                lightGray: "#F5F0ED",
                success: "#1C2826",
                winner: "#EB4511",
            },
            fontFamily: {
                ...fontFamily,
                sans: ["Montserrat", "sans-serif"],
                rucksack: ["Rucksack", "sans-serif"],
            },
        },
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant("mobile-only", "@media screen and (max-width: theme('screens.sm'))"); // instead of hard-coded 640px use sm breakpoint value from config. Or anything
        }),
    ],
};
