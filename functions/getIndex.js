export default function getIndex(arr, search) {
    return arr.map((e) => e.id).indexOf(search);
}
