//Create a temporal canvas element
export function createCanvas (width, height) {
    let canvas = document.createElement("canvas");
    canvas.width = width; //Set canvas width
    canvas.height = height; //Set canvas height
    //canvas.style.display = "none"; //Hide element
    //Return the new canvas element
    return canvas;
};


