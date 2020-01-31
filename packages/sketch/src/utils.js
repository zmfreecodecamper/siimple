//For each reversed
export function forEachRev (list, callback) {
    for (let i = list.length - 1; i >= 0; i--) {
        callback(list[i], i); //Call this element
    }
};


