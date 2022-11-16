const Button = (props) => {
    return (
        <>
            <div
                className={`cursor-pointer group ease-in-out duration-300 w-full  p-8 flex items-center justify-center ${props.klasse}`}
                onClick={props.onClick}
                style={props.style}
            >
                <div className="block relative">
                    <span className={`font-rucksack  flex ${props.textKlasse}`}>{props.children}</span>
                </div>
            </div>
        </>
    );
};

export default Button;
