import {selectionElement} from "./selection.js";
import {rectangleElement} from "./rectangle.js";
import {ellipseElement} from "./ellipse.js";
import {lineElement} from "./line.js";
import {arrowElement} from"./arrow.js";
import {textElement} from "./text.js";
import {imageElement} from "./image.js";
import {screenshotElement} from "./screenshot.js";

//Available elements
let elements = {
    "selection": selectionElement,
    "rectangle": rectangleElement,
    "ellipse": ellipseElement,
    "line": lineElement,
    "arrow": arrowElement,
    "text": textElement,
    "image": imageElement,
    "screenshot": screenshotElement
};

//Get an element
export function getElement (name) {
    return elements[name];
}

//Create a new element
export function createElement (options) {
    return Object.assign({}, elements[options.type].initialConfig, options, {
        "id": Date.now(), //TODO: replace this
        "width": 0,
        "height": 0,
        "selected": false,
        "locked": false
    });
}

//Draw the provided element
export function drawElement (context, element) {
    return elements[element.type].draw(context, element);
}

//Update the element
export function updateElement (element) {
    return elements[element.type].update(element); //Call the update method
}

