import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { showGoal, goalSum } from "../../config";
import { dev, goalStep } from "../../config";
//STORE
import useStore from "../../store/store"; // Import the zustand store

const Goal = (props) => {
    const userList = useStore((state) => state.userList);
    const [data, setData] = useState(props.data);
    const [sum, setSum] = useState(0);
    const [goal, setGoal] = useState(goalSum);
    const [percentage, setPercentage] = useState(0);
    const [goalsReached, setGoalsReached] = useState(0);
    const [showCounter, setShowCounter] = useState(false);

    const countRef = useRef();

    useEffect(() => {
        if (userList.length > 0) {
            console.log(userList);
            setSum(userList.map((e) => e?.sum).reduce((a, b) => a + b));
        }
    }, [userList]);

    useEffect(() => {
        if ((sum / goal) * 100 <= 100) {
            setPercentage((sum / goal) * 100);
        } else {
            // When the goal is reached, update the goal to the next value (goal + goalSum)
            setGoal(Math.ceil(sum / goalStep) * goalSum);
        }
    }, [goal, sum]);

    // SET PERCENTAGE AFTER REASSESING GOAL FOR PROGRESS BAR
    useEffect(() => {
        setGoalsReached(Math.floor(sum / goalSum));
        setPercentage((sum / goal) * 100);
    }, [goal, sum]);

    // SHOW TEXT AFTER ANIMATION
    useEffect(() => {
        setTimeout(() => {
            setShowCounter(true);
        }, 2000);
    }, []);

    return (
        <>
            <div className={`${props.klasse}`}>
                <div className="headline font-bold text-base xl:text-xl mb-2 sm:mb-4">Erreichtes Ziel</div>
                <div
                    className={` ${
                        percentage == 100 ? "font-bold" : ""
                    } then absolute text-xs xl:text-base font-semibold pt-2 sm:pt-4 top-0 right-0`}
                >
                    {goal.toLocaleString("de")} Euro
                </div>

                <div className="balken border  border-dashed h-3 rounded-3xl border-darkText sm:h-4 w-full relative">
                    <motion.div
                        className={`inner rounded-l-3xl ${
                            goalsReached >= 1 ? "bg-[#00A651]" : "bg-darkText"
                        }  h-full relative`}
                        id="innerProgress"
                        layout
                        initial={{
                            width: 0,
                        }}
                        animate={{ width: percentage + "%" }}
                        transition={{ duration: "300ms", stiffness: 200, delay: 1.35, type: "spring" }}
                    >
                        <div
                            ref={countRef}
                            className="now absolute text-text text-xs xl:text-base top-3 sm:top-6 whitespace-nowrap"
                            // style={{ right: percentage < 15 ? "-4rem" : "0" }}
                        >
                            {showCounter && (
                                <>
                                    {" "}
                                    {sum?.toLocaleString("de-DE", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}{" "}
                                    Euro
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Goal;
