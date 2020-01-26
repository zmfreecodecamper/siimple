import {colors, strokes} from "../defaults.js";

//Export line element
export const lineElement = {
    "icon": "minus",
    "visibleOnToolbar": true,
    "initialConfig": {
        "strokeColor": "dark",
        "strokeWidth": "small",
        "opacity": 1.0
    },
    "draw": function (element, context) {
        context.beginPath();
        context.globalAlpha = element.opacity;
        context.strokeStyle = colors[element.strokeColor];
        context.lineWidth = strokes[element.strokeWidth];
        context.lineCap = "butt"; //Default linecap
        context.setLineDash([]); //Clear line-dash style
        context.moveTo(element.x, element.y);
        context.lineTo(element.x + element.width, element.y + element.height);
        context.stroke();
        context.globalAlpha = 1; //Reset opacity
    }
};

