import react, { useContext } from "react";
import { H1 } from "../utils/headlines";
import Button from "../utils/buttons";
import { ShowUnclaimed } from "../../helper/context";

function StartText(props) {
    const { showUnclaimed, setShowUnclaimed } = useContext(ShowUnclaimed);

    return (
        <div className="wrapper relative flex justify-center">
            <div className="caller">
                <H1 klasse="text-3xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl">
                    {props.headline}
                </H1>
                <p className="mt-6 text-lg"> {props.subline}</p>
                {/* <Button // style={{ background: colors.primaryColor.toLowerCase() }}
                    klasse={`mt-8 bg-primaryColor hover:bg-primaryColorDark py-4 rounded-lg text-white font-bold uppercase text-xl leading-loose tracking-wider cursor-pointer`}
                    onClick={props.onClick}
                >
                    {props.buttonText}
                </Button> */}
            </div>
        </div>
    );
}

export default StartText;
