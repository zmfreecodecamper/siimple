import {selectionElement} from "../elements/selection.js";
import {rectangleElement} from "../elements/rectangle.js";
import {ellipseElement} from "../elements/ellipse.js";
import {lineElement} from "../elements/line.js";
import {arrowElement} from"../elements/arrow.js";
import {textElement} from "../elements/text.js";

//Available elements
let elements = {
    "selection": selectionElement,
    "rectangle": rectangleElement,
    "ellipse": ellipseElement,
    "line": lineElement,
    "arrow": arrowElement,
    "text": textElement
};

//Create a new element
export function createElement (options) {
    return Object.assign(options, elements[options.type].initialConfig, {
        "id": Date.now(), //TODO: replace thid
        "width": 0,
        "height": 0,
        "selected": false,
        "locked": false
    });
}

//Draw the provided element
export function drawElement (element, context, rc) {
    elements[element.type].draw(element, context, rc);
}

//Update the element
export function updateElement (element) {
    if (typeof elements[element.type].update === "function") {
        return elements[element.type].update(element); //Call the update method
    }
}

