import { RiMoneyEuroCircleLine } from "react-icons/ri";

function SpendenSumme(props) {
    return (
        <div className="spende grid grid-cols-12 sm:mt-6 ">
            <div className="col-span-2 flex items-center">
                <div data-tip={props.dataTip} className="text-5xl font-black opacity-50">
                    <RiMoneyEuroCircleLine />{" "}
                </div>
            </div>
            <div className="col-span-10">
                <input
                    className="text-3xl p-4 font-semibold w-full"
                    type="number"
                    name="spende"
                    id="sum"
                    placeholder="EUR 20,-"
                    onChange={(e) => {
                        props.onChange(e);
                    }}
                />
            </div>
        </div>
    );
}

export default SpendenSumme;
