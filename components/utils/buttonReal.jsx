function ButtonReal(props) {
    return (
        <>
            <button
                className={`cursor-pointer group ease-in-out duration-300 w-full h-full  p-8 flex items-center justify-center ${props.klasse}`}
                onClick={props.onClick}
                style={props.style}
                disabled={props.disabled}
            >
                <div className="block relative">
                    <span className={`font-rucksack  flex ${props.textKlasse}`}>{props.children}</span>
                </div>
            </button>
        </>
    );
}

export { ButtonReal };
