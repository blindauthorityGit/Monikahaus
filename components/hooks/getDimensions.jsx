import React, { useState, useEffect } from "react";

const GetWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener("resize", handleWindowResize);
        console.log(windowSize.innerHeight);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
};

export default GetWindowSize;
