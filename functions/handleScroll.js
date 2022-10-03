export default function handleScroll(e, setter, ref) {
    console.log("BUBU");
    setter({
        width: ref.current.children[0].children[0].width + "px",
        height: (ref.current.children[0].children[0].height / 100) * 79 + "px",
    });
}
