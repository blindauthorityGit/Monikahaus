import ImageUpload from "./imageUpload";
import { ButtonReal } from "../utils/buttonReal";
import { BtnDirector, BtnDirectorFw } from "../../functions/btnDirector";

function BildChoose(props) {
    return (
        <div ref={props.fifthRef} className="fifth hidden">
            <div className="font-bold mb-4 text-xl">Ihre Daten</div>
            <div className="topLine mb-4 text-base italic ">
                Ihr Bild wird neben Ihrem Namen angezeigt (optional, max 1MB)
                <br />
            </div>
            <ImageUpload
                anon={props.anon}
                setAnon={props.setAnon}
                kugelColor={props.kugelColor}
                setKugelColor={props.setKugelColor}
                dataTip="Ihr Avatar Bild (optional)"
            ></ImageUpload>

            <div className="grid grid-cols-2 mt-10 w-full gap-4">
                <div className={`w-full `}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={false}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            BtnDirector(props.fourthRef, props.fifthRef);
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
                            BtnDirectorFw(props.fifthRef, props.sixthRef);
                        }}
                    >
                        {props.image ? "Weiter" : "Überspringen"}
                    </ButtonReal>
                </div>
            </div>
        </div>
    );
}

export default BildChoose;
