import Comment from "./comment";
import { ButtonReal } from "../utils/buttonReal";
import { BtnDirector, BtnDirectorFw } from "../../functions/btnDirector";

function CommentChoose(props) {
    return (
        <div ref={props.sixthRef} className="sixth hidden">
            <div className="font-bold mb-4 text-xl">Ihre Daten</div>
            <div className="topLine mb-4 text-base italic ">
                Ihr Kommentar, max 60 Zeichen (optional)
                <br />
            </div>
            <Comment onChange={props.onChange} dataTip="Ihr Kommentar (optional)"></Comment>

            <div className="grid grid-cols-2 mt-10 w-full gap-4">
                <div className={`w-full `}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        disabled={false}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            BtnDirector(props.fourthRef, props.sixthRef);
                        }}
                    >
                        Zurück
                    </ButtonReal>
                </div>
                <div className={`w-full bottom-2 `}>
                    <ButtonReal // style={{ background: colors.primaryColor.toLowerCase() }}
                        // disabled={anon ? false : true}
                        klasse={`bg-black hover:bg-primaryColorDark py-2 px-6 rounded-lg text-white font-semibold uppercase text-base leading-loose tracking-wider cursor-pointer`}
                        onClick={() => {
                            BtnDirectorFw(props.sixthRef, props.seventhRef);
                            props.setIsChoice(true);
                        }}
                    >
                        {props.comment ? "Weiter" : "Überspringen"}
                    </ButtonReal>
                </div>
            </div>
        </div>
    );
}

export default CommentChoose;
