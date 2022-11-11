import { FaRegCommentDots } from "react-icons/fa";

function Comment(props) {
    return (
        <div className="comment grid grid-cols-12 mt-2 sm:mt-6 ">
            <div className="col-span-2 flex items-center">
                <div data-tip={props.dataTip} className="text-xl sm:text-5xl font-black opacity-50">
                    <FaRegCommentDots />
                </div>{" "}
            </div>

            <div className="col-span-10">
                <textarea
                    className="text-base sm:text-xl p-4 font-semibold"
                    rows="2"
                    cols="40"
                    name="comment"
                    id="comment"
                    maxLength="60"
                    placeholder="Ihr Kommentar (max 60 Zeichen)"
                    onChange={(e) => {
                        props.onChange(e);
                    }}
                />
            </div>
        </div>
    );
}

export default Comment;
