import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { showGoal, goalSum, dev, goalStep } from "../../config";
// STORE
import useStore from "../../store/store";

const Goal = (props) => {
    const userList = useStore((state) => state.userList);

    const [sum, setSum] = useState(0);
    const [goal, setGoal] = useState(goalSum || 0);
    const [percentage, setPercentage] = useState(0);
    const [goalsReached, setGoalsReached] = useState(0);
    const [showCounter, setShowCounter] = useState(false);

    const countRef = useRef();

    // SUMME SICHER BERECHNEN
    useEffect(() => {
        const total = userList.reduce((acc, e) => {
            const value = Number(e?.sum);
            return acc + (isNaN(value) ? 0 : value);
        }, 0);
        setSum(total);
    }, [userList]);

    // GOAL & PROZENT BERECHNEN (mit Fallbacks)
    useEffect(() => {
        const baseGoal = goal || goalSum || 0;

        if (baseGoal <= 0) {
            setPercentage(0);
            setGoalsReached(0);
            return;
        }

        const reached = Math.floor(sum / goalSum);
        setGoalsReached(reached);

        let pct = (sum / baseGoal) * 100;

        if (!isFinite(pct) || isNaN(pct)) {
            pct = 0;
        }

        if (pct <= 100) {
            setPercentage(pct);
        } else {
            const newGoal = Math.ceil(sum / goalStep) * goalSum;
            setGoal(newGoal);
            const newPct = (sum / newGoal) * 100;
            setPercentage(!isFinite(newPct) || isNaN(newPct) ? 0 : newPct);
        }
    }, [sum, goal]);

    // TEXT NACH ANIMATION ANZEIGEN
    useEffect(() => {
        const t = setTimeout(() => {
            setShowCounter(true);
        }, 2000);
        return () => clearTimeout(t);
    }, []);

    const displayGoal = Number.isFinite(goal) ? goal : 0;
    const displaySum = Number.isFinite(sum) ? sum : 0;
    const displayPercentage = Number.isFinite(percentage) ? percentage : 0;

    return (
        <div className={props.klasse}>
            <div className="headline font-bold text-base xl:text-xl mb-2 sm:mb-4">Erreichtes Ziel</div>

            <div
                className={`${
                    displayPercentage === 100 ? "font-bold" : ""
                } then absolute text-xs xl:text-base font-semibold pt-2 sm:pt-4 top-0 right-0`}
            >
                {displayGoal.toLocaleString("de-DE")} Euro
            </div>

            <div className="balken border border-dashed h-3 rounded-3xl border-darkText sm:h-4 w-full relative">
                <motion.div
                    className={`inner rounded-l-3xl ${
                        goalsReached >= 1 ? "bg-[#00A651]" : "bg-darkText"
                    } h-full relative`}
                    id="innerProgress"
                    layout
                    initial={{ width: 0 }}
                    animate={{ width: `${displayPercentage}%` }}
                    transition={{ duration: "300ms", stiffness: 200, delay: 1.35, type: "spring" }}
                >
                    <div
                        ref={countRef}
                        className="now absolute text-text text-xs xl:text-base top-3 sm:top-6 whitespace-nowrap"
                    >
                        {showCounter && (
                            <>
                                {displaySum.toLocaleString("de-DE", {
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
    );
};

export default Goal;
