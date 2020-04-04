import {theme} from "../theme.js";

//Export line element
export const lineElement = {
    "icon": "minus",
    "visibleOnToolbar": true,
    "initialConfig": {
        "strokeColor": "dark",
        "strokeWidth": "small",
        "strokeDash": false,
        "opacity": 1.0
    },
    "draw": function (context, element) {
        context.beginPath();
        context.globalAlpha = element.opacity;
        context.strokeStyle = theme.colors[element.strokeColor];
        context.lineWidth = theme.strokes[element.strokeWidth];
        context.lineCap = "butt"; //Default linecap
        context.setLineDash([]); //Clear line-dash style
        if (element.strokeDash === true) {
            let lineDash = theme.strokes[element.strokeWidth] * 3;
            context.setLineDash([lineDash, lineDash]); //Set default line-dash
        }
        context.moveTo(element.x, element.y);
        context.lineTo(element.x + element.width, element.y + element.height);
        context.stroke();
        context.globalAlpha = 1; //Reset opacity
    },
    "update": function () {
        return null; //Nothing to do
    }
};

