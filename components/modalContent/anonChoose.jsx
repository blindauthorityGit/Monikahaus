import { forwardRef } from "react";
import AnonChoice from "./anonChoice";
import { ButtonReal } from "../utils/buttonReal";
import { BtnDirector, BtnDirectorFw } from "../../functions/btnDirector";

function AnonChoose(props, ref) {
    return (
        <div ref={props.thirdRef} className="third hidden">
            <div className="font-bold mb-4 text-xl">Ihre Daten</div>
            <div className="topLine mb-6 text-base italic ">
                Möchten Sie anonym bleiben oder Ihre Daten sichtbar machen?
                <br />
                {/* <span className="text-xs leading-tight">
         {" "}
         Sie können Ihren Namen, ein Bild, die Spendensumme und ein Kommentar hinterlassen, das
         für andere sichtbar wird:
      </span> */}
            </div>
            <AnonChoice
                ref={props.anonRef}
                onClickNonAnon={(e) => {
                    props.anon.ef.current.children[0].classList.add("bg-black", "text-white");
                    document.querySelector("#nonAnon").classList.add("bg-black", "text-white");
                    document.querySelector("#anon").classList.remove("bg-black", "text-white");
                    props.anon.ef.current.children[1].classList.remove("bg-black", "text-white");
                    props.setUserData({ ...props.userData, anon: false });
                    props.setAnon(true);
                    console.log(props.userData);
                }}
                onClickAnon={(e) => {
                    props.anon.ef.current.children[1].classList.add("bg-black", "text-white");
                    props.anon.ef.current.children[0].classList.remove("bg-black", "text-white");
                    document.querySelector("#nonAnon").classList.remove("bg-black", "text-white");
                    document.querySelector("#anon").classList.add("bg-black", "text-white");
                    props.setUserData({ ...props.userData, anon: true });
                    props.setAnon(true);
                    console.log(props.userData);
                }}
            ></AnonChoice>

            <div className="grid grid-cols-2 mt-10 w-full gap-4">
                <div className={`w-full `}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={false}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            BtnDirector(props.secondRef, props.thirdRef);
                        }}
                    >
                        Zurück
                    </ButtonReal>
                </div>
                <div className={`w-full bottom-2  ${props.anon ? "" : "opacity-30"}`}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={props.anon ? false : true}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            if (props.userData.anon) {
                                BtnDirectorFw(props.thirdRef, props.seventhRef);
                                props.setIsChoice(true);
                                unclaimedHighlight();
                                console.log(props.userData);
                            } else {
                                BtnDirectorFw(props.thirdRef, props.fourthRef);
                                console.log(props.userData);
                            }
                        }}
                    >
                        Weiter
                    </ButtonReal>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(AnonChoose);
