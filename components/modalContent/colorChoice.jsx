import { GiCheckMark } from "react-icons/gi";
import { colors } from "../../config";
import { MdFormatColorFill } from "react-icons/md";

function ColorChoice(props) {
    return (
        <div className="colors w-3/4">
            <div className="grid grid-cols-12">
                <div className="col-span-3 flex items-center">
                    <div data-tip={props.dataTip} className="text-5xl font-black opacity-50">
                        <MdFormatColorFill />
                    </div>
                </div>
                <div className="col-span-9">
                    <div className="wrapper flex justify-between" ref={props.ballRef}>
                        {colors.bgColors.map((e, i) => {
                            return (
                                <div
                                    className={`colorBall rounded-full flex items-center justify-center ${
                                        e === "#fff" ? "border-4" : ""
                                    } hover:scale-110 transition cursor-pointer`}
                                    onClick={(e) => {
                                        props.onChangeColor(e);
                                        e.target.classList.add("jello-horizontal");
                                    }}
                                    onAnimationEnd={(e) => {
                                        e.target.classList.remove("jello-horizontal");
                                    }}
                                    id="color"
                                    data-id={i}
                                    key={`farbKugel${i}`}
                                    style={{
                                        width: props.size + "px",
                                        height: props.size + "px",
                                        background: e,
                                    }}
                                >
                                    <div className="icon hidden text-2xl">
                                        <GiCheckMark color={props.checked == 3 ? "black" : "white"}></GiCheckMark>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ColorChoice;