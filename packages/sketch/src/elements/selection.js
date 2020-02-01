import {theme} from "../theme.js";

//Export selection element
export const selectionElement = {
    "icon": null,
    "visibleOnToolbar": false,
    "initialConfig": {},
    "draw": function (context, element) {
        context.globalAlpha = theme.selectionOpacity;
        context.beginPath();
        context.fillStyle = theme.selectionColor;
        context.rect(element.x, element.y, element.width, element.height);
        context.fill();
        context.globalAlpha = 1; //Reset alpha
    },
    "update": function () {
        return null; //Nothing to do
    }
};

