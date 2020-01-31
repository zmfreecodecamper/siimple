import {selectionColor} from "../sketch/defaults.js";

//Export selection element
export const selectionElement = {
    "icon": null,
    "visibleOnToolbar": false,
    "initialConfig": {},
    "draw": function (element, context) {
        context.beginPath();
        context.fillStyle = selectionColor;
        context.rect(element.x, element.y, element.width, element.height);
        context.fill();
    }
};

