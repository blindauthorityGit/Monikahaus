function BtnDirector(backRef, forwardFef) {
    backRef.current.classList.remove("hidden");
    backRef.current.classList.add("block");
    forwardFef.current.classList.remove("block");
    forwardFef.current.classList.add("hidden");
}
function BtnDirectorFw(backRef, forwardFef) {
    backRef.current.classList.add("hidden");
    forwardFef.current.classList.remove("hidden");
    forwardFef.current.classList.add("block");
}

export { BtnDirector, BtnDirectorFw };
