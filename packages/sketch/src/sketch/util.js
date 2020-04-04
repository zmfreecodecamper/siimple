//For each reversed
export function forEachRev (list, callback) {
    for (let i = list.length - 1; i >= 0; i--) {
        callback(list[i], i); //Call this element
    }
};

//Get absolute positions
export function getAbsolutePositions (position, size) {
    return [
        Math.min(position, position + size),
        Math.max(position, position + size)
    ];
}


