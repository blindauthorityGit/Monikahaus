import React, { useState, useEffect, useRef, forwardRef } from "react";
import { motion } from "framer-motion";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { useWindowSize, useWindowWidth, useWindowHeight } from "@react-hook/window-size";

const SVG = (props, ref) => {
    const [closeMe, setCloseMe] = useState(props.closeMe);
    const [mobile, setMobile] = useState(false);

    const [width, height] = useWindowSize();
    const onlyWidth = useWindowWidth();
    const onlyHeight = useWindowHeight();

    const [realWidth, setRealWidth] = useState(0);

    useEffect(() => {
        console.log(isMobile);
        setMobile(isMobile);
    }, [isMobile]);

    useEffect(() => {
        console.log(onlyWidth);
        console.log(widthCheck(onlyWidth));
        setRealWidth(onlyWidth);
        function handleResize() {
            // Set window width/height to state
            setRealWidth(onlyWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function widthCheck(width) {
        if (width <= 768) {
            return "920";
        }
        if (width >= 769) {
            return "1025";
        }
    }

    return (
        <svg
            className={`absolute overflow-hidden z-10 ${mobile ? " left-1/2 transform -translate-x-1/2 " : null}`}
            xmlns="http://www.w3.org/2000/svg"
            width={mobile ? "80%" : "100%"}
            height="100%"
            // viewBox="0 0 526.157 794.811"
            viewBox={`0 0 526.157 ${mobile ? 1294 : 994.811}`}
        >
            <motion.g
                // style={{ opacity: 0.5 }}
                id="Gruppe_272"
                data-name="Gruppe 272"
                // transform={`translate(3908.159 ${mobile ? "920.176" : "1025.176"}`}
                // transform="translate(3908.159 1025.176)"
                transform={`translate(3908.159 ${realWidth <= 500 ? "920" : "1025"} )`}
                initial={{
                    opacity: 0,
                }}
                animate={{ opacity: 1 }}
                ref={ref}
            >
                <g id="Gruppe_204" data-name="Gruppe 204" transform="translate(-3908.159 -917.583)">
                    <motion.rect
                        id="Rechteck_66"
                        data-name="Rechteck 66"
                        width="31.648"
                        height="155.533"
                        transform="translate(257.14 531.685)"
                        layout
                        initial={{
                            x: 257.14,
                            y: 900,
                            scale: 1,
                            rotate: 0,
                        }}
                        animate={{ x: 257.14, y: props.closeMe ? 700 : 531.685, scale: 1, rotate: 0 }}
                        transition={{ duration: props.duration, delay: props.delay, type: "spring" }}
                    />
                    <motion.path
                        id="Pfad_228"
                        data-name="Pfad 228"
                        d="M-3523.493,136.2l-258.188,391.111,501.828,25Z"
                        transform="translate(3806.01 65.955)"
                        fill="#7e856e"
                        layout
                        initial={{
                            x: 3806,
                            y: 500,
                            scale: 0.75,
                            rotate: 0,
                        }}
                        animate={{ x: 3806.77, y: props.closeMe ? 600 : 65.955, scale: 1.02, rotate: 0 }}
                        transition={{ duration: props.duration, delay: 0.35, type: "spring" }}
                    />
                    <motion.path
                        id="Pfad_312"
                        data-name="Pfad 312"
                        d="M-3625.126-193.4l-283.032,399.181,480.109-99.876Z"
                        transform="matrix(0.999, 0.035, -0.035, 0.999, 3915.219, 415.32)"
                        opacity="0.27"
                        layout
                        initial={{
                            x: 3915.219,
                            y: 400,
                            scale: 0,
                            rotate: 0,
                        }}
                        animate={{ x: 3915.219, y: 285.045, scale: 1, rotate: 0 }}
                        transition={{ duration: props.duration, delay: 0.5, type: "spring" }}
                    />
                    <motion.path
                        id="Pfad_229"
                        data-name="Pfad 229"
                        d="M-3625.126-193.4l-283.032,399.181,480.109-99.876Z"
                        transform="translate(3908.159 279.045)"
                        fill="#7e856e"
                        layout
                        initial={{
                            x: 3908.159,
                            y: 400,
                            scale: 0,
                            rotate: 0,
                        }}
                        animate={{ x: 3908.15, y: 279.045, scale: 1, rotate: 0 }}
                        transition={{ duration: props.duration, delay: 0.5, type: "spring" }}
                    />
                    <motion.path
                        id="Pfad_230"
                        data-name="Pfad 230"
                        d="M-3295.743-562.054l-152.989,246,376.186,91.777Z"
                        transform="matrix(0.999, 0.035, -0.035, 0.999, 3550.804, 680.312)"
                        opacity="0.23"
                        layout
                        initial={{
                            x: 3566.524,
                            y: 400,
                            scale: 0,
                            rotate: 0,
                        }}
                        animate={{ x: 3566.524, y: 565.054, scale: 1, rotate: 0 }}
                        transition={{ duration: props.duration, delay: 0.75, type: "spring" }}
                    />
                    <motion.path
                        id="Pfad_313"
                        data-name="Pfad 313"
                        d="M-3293.4-562.054-3448.732-315.47l381.953,92Z"
                        transform="translate(3566.524 558.054)"
                        fill="#7e856e"
                        layout
                        initial={{
                            x: 3566.524,
                            y: 400,
                            scale: 0,
                            rotate: 0,
                        }}
                        animate={{ x: 3566.524, y: 558.054, scale: 1, rotate: 0 }}
                        transition={{ duration: props.duration, delay: 0.75, type: "spring" }}
                    />
                </g>
                <motion.path
                    id="Pfad_231"
                    data-name="Pfad 231"
                    className="hidden sm:block"
                    d="M-3042.63-1025.176l6.38,40.454,32.2-13.555-25.818,26.9,25.818,26.9-32.2-13.554-6.38,40.453-6.378-40.453-32.2,13.554,25.818-26.9-25.818-26.9,32.2,13.555Z"
                    transform="translate(-592.133)"
                    fill="#dcdfdc"
                    layout
                    initial={{
                        x: -592.133,
                        y: 0,
                        scale: 0,
                    }}
                    animate={{ x: -592.133, y: 0, scale: 1, rotate: 0 }}
                    transition={{ duration: props.duration, delay: 1.25, type: "spring" }}
                />
            </motion.g>
        </svg>
    );
};

export default forwardRef(SVG);
