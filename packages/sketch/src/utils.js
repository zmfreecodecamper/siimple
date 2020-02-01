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

//Convert a data to blob
//Idea from https://stackoverflow.com/a/19328891
export function toBlob (content, type) {
    return new Blob([content], {
        "type": type
    });
}

//Save Blob to file
//Based on https://stackoverflow.com/a/19328891
export function blobToFile (blob, name) {
    //Create the link element to download the file
    let link = document.createElement("a");
    link.style.display = "none"; //Hide link element
    document.body.appendChild(link); //Append to body
    //let blob = new Blob([content], {
    //    "type": type
    //});
    let url = window.URL.createObjectURL(blob); //Create url
    link.href = url; //Set the link url as the generated url
    link.download = name; //Set the filename
    link.click(); //Download the file
    window.URL.revokeObjectURL(url); //Revoke url
    document.body.removeChild(link); //Remove from body
}

//Save Blob to clopboard
//Based on https://stackoverflow.com/a/57546936
export function blobToClipboard (blob) {
    navigator.clipboard.write([
        new ClipboardItem({
            [blob.type]: blob
        })
    ]);
}


