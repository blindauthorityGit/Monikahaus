import React, { useState, useEffect, useContext, useRef } from "react";
import MainContainer from "../layout/mainContainer";
import { H2 } from "../utils/headlines";
import Draggable from "../dragNDrop/draggable";
import { DragOverlay } from "@dnd-kit/core";
import Item from "../dragNDrop/item";
import { createPortal } from "react-dom";
import Droppable from "../dragNDrop/droppable";
import { TreeAnimationFinish, KugelColor } from "../../helper/context";
import { colors } from "../../config";
import { GiCheckMark } from "react-icons/gi";
import Slider from "react-rangeslider";
import QMark from "../../assets/qmark.svg";

const FirstModal = (props) => {
    const { treeAnimationFinish, setTreeAnimationFinish } = useContext(TreeAnimationFinish);
    const [size, setSize] = useState(0);
    const [checked, setChecked] = useState(0);
    const [color, setColor] = useState(null);
    const [value, setValue] = useState(10);
    const [name, setName] = useState("");
    const [anon, setAnon] = useState(false);

    const { kugelColor, setKugelColor } = useContext(KugelColor);

    const ballRef = useRef();

    const [donateData, setDonateData] = useState({
        color: "",
        spende: 0,
        fullName: "",
    });

    // const { value } = value;

    const onChangeColor = (e) => {
        let arr = Array.from(ballRef.current.querySelectorAll(".colorBall"));
        arr.map((e) => e.children[0].classList.add("hidden"));
        arr[e.currentTarget.dataset.id].children[0].classList.remove("hidden");
        arr[e.currentTarget.dataset.id].children[0].classList.add("block");
        setChecked(e.currentTarget.dataset.id);
        setDonateData({ ...donateData, [e.currentTarget.id]: e.currentTarget.style.backgroundColor });
        setColor(e.currentTarget.style.backgroundColor);
        setKugelColor({ ...kugelColor, color: e.currentTarget.style.backgroundColor });
        console.log(donateData);
    };
    const onChange = (e) => {
        setDonateData({ ...donateData, [e.target.name]: e.target.value });
        console.log(donateData);
    };

    useEffect(() => {
        console.log("Baum feddisch Kugel");
        let arr = Array.from(document.querySelectorAll(".kugel"));
        setSize(arr[0].clientHeight);
    }, [treeAnimationFinish]);

    return (
        <MainContainer width="fixed relative">
            <div className="col-span-12">
                <H2 klasse="font-bold mb-16">{props.headline}</H2>
                <div className="colors w-2/4">
                    <div className="topLine mb-8">Wählen Sie Ihre Farbe</div>
                    <div className="wrapper flex justify-between" ref={ballRef}>
                        {colors.bgColors.map((e, i) => {
                            return (
                                <div
                                    className={`colorBall rounded-full flex items-center justify-center ${
                                        e === "#fff" ? "border-4" : ""
                                    } hover:scale-110 transition cursor-pointer`}
                                    onClick={(e) => {
                                        onChangeColor(e);
                                        e.target.classList.add("jello-horizontal");
                                    }}
                                    onAnimationEnd={(e) => {
                                        e.target.classList.remove("jello-horizontal");
                                    }}
                                    id="color"
                                    data-id={i}
                                    key={`farbKugel${i}`}
                                    style={{ width: size + "px", height: size + "px", background: e }}
                                >
                                    <div className="icon hidden text-2xl">
                                        <GiCheckMark color={checked == 3 ? "black" : "white"}></GiCheckMark>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="spende">
                    <input
                        className="mt-16 text-3xl p-8 border font-semibold"
                        type="number"
                        name="spende"
                        id="sum"
                        placeholder="EUR 20,-"
                        onChange={(e) => {
                            onChange(e);
                        }}
                    />
                </div>
                <div className="name">
                    <input
                        className="mt-16 text-3xl p-8 border font-semibold"
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Ihr Name"
                        onChange={(e) => {
                            onChange(e);
                            setName(e.target.value);
                            setKugelColor({ ...kugelColor, name: e.target.value });
                        }}
                    />
                </div>

                <div className="file mt-8">
                    <div className="wrapper flex items-center">
                        <input
                            className="text-xl p-8 border font-semibold "
                            type="file"
                            name="file"
                            id="file"
                            placeholder="Bild"
                            onChange={(e) => {
                                anon ? setAnon(false) : setAnon(true);
                                anon
                                    ? setKugelColor({ ...kugelColor, anon: false })
                                    : setKugelColor({ ...kugelColor, anon: true });
                            }}
                        />{" "}
                        <label className="ml-4 text-lg" for="file">
                            Bild Upload Avatar
                        </label>
                    </div>
                </div>
                <div className="anonym mt-8">
                    <div className="wrapper flex items-center">
                        <img src={QMark.src} className="pr-4" alt="" />
                        <input
                            className="text-lg p-8 border font-semibold "
                            type="checkbox"
                            name="anon"
                            id="anon"
                            placeholder="Ihr Name"
                            onChange={(e) => {
                                anon ? setAnon(false) : setAnon(true);
                                anon
                                    ? setKugelColor({ ...kugelColor, anon: false })
                                    : setKugelColor({ ...kugelColor, anon: true });
                            }}
                        />{" "}
                        <label className="ml-4 text-lg" for="anon">
                            Anonyme Spende?
                        </label>
                    </div>
                </div>

                <div className="absolute bg-white h-48 w-48 right-[-190px] rounded-full shadow-xl top-[35%] flex items-center justify-center">
                    <div className="absolute top-8">DRAG ME</div>
                    <Draggable
                        id="draggable"
                        value="bubu"
                        style={{ width: size + "px", height: size + "px", background: kugelColor.color }}
                        klasse={`${props.isDropped ? "hidden" : "block"} ${
                            props.isDragging ? "opacity-30" : ""
                        } rounded-full flex items-center justify-center ${
                            kugelColor == "rgb(255, 255, 255)" || kugelColor == "rgb(220, 223, 220)"
                                ? "text-black"
                                : "text-white"
                        }`}
                    >
                        {anon
                            ? "Anon"
                            : name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join(".")}
                    </Draggable>
                </div>
                <div className="flex justify-end">
                    <div className="btn border p-4 cursor-pointer opacity-50">Weiter</div>
                </div>
                {/* KLASSE HIDDEN NOCH BUGGY */}

                {createPortal(
                    <DragOverlay
                        dropAnimation={{
                            duration: 300,
                            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                        }}
                    >
                        {props.activeId ? (
                            <Item
                                style={{ width: size + "px", height: size + "px", background: kugelColor.color }}
                                value={`Item ${props.activeId}`}
                                klasse="rounded-full"
                            />
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </div>
        </MainContainer>
    );
};

export default FirstModal;
