import React, { useRef, useEffect, forwardRef } from "react";

//COMPS
import { CoverImage } from "../images";

//ASSETS
import Baum from "../../assets/baum2.svg";

//HOOKS
import useElementDimensions from "../../hooks/useDimensions";

// STATE
import useStore from "../../store/store";

const BaumGraphic = () => {
    const { ref, dimensions } = useElementDimensions();
    const setDimensions = useStore((state) => state.setDimensions);

    //GLOBAL ANIMATION TREE STATE
    const animateTree = useStore((state) => state.animateTree);
    const animationEndCounter = useStore((state) => state.animationEndCounter);
    const setAnimationEndCounter = useStore((state) => state.setAnimationEndCounter);

    //ANIMATION TRACKER
    const swipeCount = useStore((state) => state.swipeCount);

    useEffect(() => {
        const handleAnimationEnd = () => {
            ref.current.classList.remove(animateTree == "right" ? "slide-out-right" : "slide-out-left");
            const randomString = [...Array(6)]
                .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
                .join("");

            setAnimationEndCounter(randomString);
        };
        const handleAnimationEndMobile = () => {
            ref.current.classList.remove(animateTree == "right" ? "mobile-slide-out-right" : "mobile-slide-out-left");
            const randomString = [...Array(6)]
                .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
                .join("");

            setAnimationEndCounter(randomString);
        };

        const isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed

        if (animateTree === "right") {
            ref.current.classList.add(isMobile ? "mobile-slide-out-right" : "slide-out-right");
            ref.current.removeEventListener("animationend", isMobile ? handleAnimationEndMobile : handleAnimationEnd);
            ref.current.addEventListener("animationend", isMobile ? handleAnimationEndMobile : handleAnimationEnd);
        } else if (animateTree === "left") {
            ref.current.classList.add(isMobile ? "mobile-slide-out-left" : "slide-out-left");
            ref.current.removeEventListener("animationend", isMobile ? handleAnimationEndMobile : handleAnimationEnd);
            ref.current.addEventListener("animationend", isMobile ? handleAnimationEndMobile : handleAnimationEnd);
        } else {
            // Reset any animation classes and remove the event listener
            ref.current.classList.remove(
                "slide-out-right",
                "slide-out-left",
                "mobile-slide-out-right",
                "mobile-slide-out-left"
            );
            ref.current.removeEventListener("animationend", handleAnimationEnd);
        }

        return () => {
            ref.current?.removeEventListener("animationend", handleAnimationEnd);
        };
    }, [animateTree, ref, setAnimationEndCounter, swipeCount]);

    // Use useEffect to set the dimensions once they are available
    useEffect(() => {
        if (dimensions.width > 0 && dimensions.height > 0) {
            setDimensions(dimensions.width, dimensions.height);
        }
    }, [dimensions, setDimensions]);

    return (
        <>
            <CoverImage
                src={Baum.src} // Replace with the actual path to your image
                mobileSrc={Baum.src} // Replace with the actual path to your image
                alt="Cover Background"
                position="absolute"
                height="251px" // Set the desired height of the background image
                width="169px"
                style={{ aspectRatio: "618 / 877" }}
                className="z-[-1]  top-0 w-[72vw] sm:w-[60vw] h-[auto] lg:w-[34vw] xl:h-[auto] 2xl:w-[58vh] 3xl:w-[40vw]"
                ref={ref}
                onLoadingComplete={(e) => {
                    console.log(e.clientWidth, e.clientHeight);
                    if (dimensions.width > 0 && dimensions.height > 0) {
                        console.log(dimensions.width, dimensions.height);
                        setDimensions(dimensions.width, dimensions.height);
                    }
                }}
            />
        </>
    );
};

export default BaumGraphic;
