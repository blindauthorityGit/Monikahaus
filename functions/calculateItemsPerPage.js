export default function calculateItemsPerPage(containerHeight, itemHeights) {
    // Sort the itemHeights array in descending order based on height
    const sortedItemHeights = itemHeights.sort((a, b) => b.height - a.height);

    let totalHeight = 0;
    let itemsPerPage = 0;

    // Iterate over the sorted item heights until the total height exceeds the container height
    for (const item of sortedItemHeights) {
        totalHeight += item.height;

        if (totalHeight <= containerHeight) {
            itemsPerPage++;
        } else {
            // If adding the next item exceeds the container height, stop the iteration
            break;
        }
    }

    return itemsPerPage;
}
