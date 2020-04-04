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

//Convert DataURL to blob
//https://stackoverflow.com/a/30407959
export function dataUrlToBlob (data, callback) {
    let list = data.split(",");
    let bstr = atob(list[1]);
    let size = bstr.length;
    let u8list = new Uint8Array(size);
    while (n > 0) {
        u8list[n-1] = bstr.charCodeAt(n-1);
        n = n - 1;
    }
    return new Blob([u8list], {
        "type": list[0].match(/:(.*?);/)[1] //Extract mime type
    });
}

//Convert Blob to DataURL
export function blobToDataUrl (blob, callback) {
    let file = new FileReader();
    file.onload = function (event) {
        return callback(event.target.result);
    };
    return file.readAsDataURL(blob);
}

//Get pasted items
export function getDataFromClipboard (event, callback) {
    if (!event.clipboardData || typeof event.clipboardData.items === "undefined") {
        return null; //No clipboard data
    }
    //Get items
    let items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        let item = items[i]; //Get current item
        if (item.type.indexOf("image") !== -1) {
            return callback("image", item.getAsFile()); //Get as image
        }
        else if (item.type.indexOf("text") !== -1) {
            //return callback("text", item.getData("text")); //Get as text
            return item.getAsString(function (content) {
                return callback("text", content); //Send text content
            });
        }
    }
    //No data copied
    return null;
}


