export default function calculateToolTipPosition(ballsPerTree, currentTree, id) {
    console.log((currentTree + 1) * ballsPerTree, id);
    return (currentTree + 1) * ballsPerTree - id <= 21;
}
