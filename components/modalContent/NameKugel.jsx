import { BsFillPersonLinesFill } from "react-icons/bs";

function NameKugel(props) {
    return (
        <div className="name grid grid-cols-12 mt-6 ">
            <div className="col-span-2 flex items-center">
                <div data-tip={props.dataTip} className="text-5xl font-black opacity-50">
                    <BsFillPersonLinesFill />{" "}
                </div>
            </div>
            <div className="col-span-10">
                <input
                    className="text-3xl p-6  font-semibold"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Ihr Name"
                    onChange={(e) => {
                        props.onChange(e);
                        props.setName(e.target.value);
                        props.setKugelColor({ ...props.kugelColor, name: e.target.value });
                    }}
                />
            </div>
        </div>
    );
}

export default NameKugel;
