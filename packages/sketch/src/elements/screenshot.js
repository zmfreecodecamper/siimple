import {theme} from "../theme.js";

//Export screenshot selection element
export const screenshotElement = {
    "icon": null,
    "visibleOnToolbar": false,
    "initialConfig": {},
    "draw": function (context, element) {
        context.globalAlpha = theme.screenshotOpacity;
        context.beginPath();
        context.fillStyle = theme.screenshotColor;
        context.rect(element.x, element.y, element.width, element.height);
        context.fill();
        context.globalAlpha = 1; //Reset alpha
    },
    "update": function () {
        return null; //Nothing to do
    }
};

