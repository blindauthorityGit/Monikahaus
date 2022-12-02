import MobileSecond from "./mobileSecond";
import { ButtonReal } from "../utils/buttonReal";
import { BtnDirector, BtnDirectorFw } from "../../functions/btnDirector";

function SpendenChoose(props) {
    return (
        <div ref={props.secondRef} className="second hidden">
            <div className="font-bold mb-4 text-xl">Spendensumme</div>
            <div className="topLine mb-6 text-base italic">
                Wieviel möchten Sie spenden?
                <br />
                Wählen Sie Ihre Summe:
            </div>
            <MobileSecond onChange={props.onChange}></MobileSecond> {/* <hr className="mt-6" /> */}
            <div className="grid grid-cols-2 mt-10 w-full gap-4">
                <div className={`w-full `}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={false}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            console.log("TEST");
                            props.classList.remove("hidden");
                            props.classList.add("block");
                            props.secondRef.current.classList.remove("block");
                            props.secondRef.current.classList.add("hidden");
                        }}
                    >
                        Zurück
                    </ButtonReal>
                </div>
                <div
                    className={`w-full bottom-2  ${
                        props.userData.spende && props.userData.spende > 0 ? "" : "opacity-30"
                    }`}
                >
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={props.userData.spende && props.userData.spende > 0 ? false : true}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            BtnDirectorFw(props.secondRef, props.thirdRef);
                        }}
                    >
                        Weiter
                    </ButtonReal>
                </div>
            </div>
        </div>
    );
}

export default SpendenChoose;
