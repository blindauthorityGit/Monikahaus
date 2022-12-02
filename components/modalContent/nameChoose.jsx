import NameKugel from "./NameKugel";
import { ButtonReal } from "../utils/buttonReal";
import { BtnDirector, BtnDirectorFw } from "../../functions/btnDirector";

function NameChoose(props) {
    return (
        <div ref={props.fourthRef} className="fourth hidden">
            <div className="font-bold mb-4 text-xl">Ihre Daten</div>
            <div className="topLine mb-4 text-base italic ">
                Ihr Name wird als auf Ihren Kugel-Daten angezeigt (optional)
                <br />
                {/* <span className="text-xs leading-tight">
         {" "}
         Sie können Ihren Namen, ein Bild, die Spendensumme und ein Kommentar hinterlassen, das
         für andere sichtbar wird:
      </span> */}
            </div>
            <NameKugel
                setName={props.setName}
                kugelColor={props.kugelColor}
                setKugelColor={props.setKugelColor}
                onChange={props.onChange}
                dataTip="Ihr Name, wird als Initialen auf der Kugel angezeigt"
            ></NameKugel>
            {/* <hr className="mt-6" /> */}

            <div className="grid grid-cols-2 mt-10 w-full gap-4">
                <div className={`w-full `}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={false}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            BtnDirector(props.thirdRef, props.fourthRef);
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
                            BtnDirectorFw(props.fourthRef, props.fifthRef);
                        }}
                    >
                        {props.fullName ? "Weiter" : "Überspringen"}
                    </ButtonReal>
                </div>
            </div>
        </div>
    );
}

export default NameChoose;
