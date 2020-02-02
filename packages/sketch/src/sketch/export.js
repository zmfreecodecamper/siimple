import {renderSketch} from "./render.js";
import {createCanvas} from "./scene.js";

//Export types
export const exportFormats = {
    "png": {
        "icon": "image",
        "extname": ".png",
        "label": "Export as PNG",
        "available": true
    },
    "svg": {
        "icon": "image",
        "extname": ".svg",
        "label": "Export as SVG",
        "available": false
    }
};

//Export sketch as PNG image
export function exportAsPNG (sketch, options, callback) {
    //TODO: check the export format
    let elements = sketch.elements;
    let canvas = createCanvas(options.width, options.height);
    canvas.style.display = "none"; //Hide canvas
    let context = canvas.getContext("2d"); //Get canvas context
    //Render the sketch
    renderSketch(context, elements, Object.assign({}, options, {
        "grid": false, //No grid
        "selection": [] //No selection
    }));
    //Generate the PNG image
    document.body.appendChild(canvas); //Append the canvas element
    return canvas.toBlob(function (blob) {
        document.body.removeChild(canvas); //Remove the canvas
        return callback(blob); //Return the blob
    });
}

//Export sketch as SVG image
export function exportAsSVG (sketch, options, callback) {
    return null; //TODO
}

