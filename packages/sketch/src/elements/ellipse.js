import {theme} from "../theme.js";

//Export ellipse element
export const ellipseElement = {
    "icon": "circle",
    "visibleOnToolbar": true,
    "initialConfig": {
        "fillColor": "transparent",
        "strokeColor": "dark",
        "strokeWidth": "small",
        "strokeDash": false,
        "opacity": 1.0
    },
    "draw": function (context, element) {
        let rx = element.width / 2;
        let ry = element.height / 2;
        context.beginPath();
        context.globalAlpha = element.opacity;
        context.ellipse(element.x + rx, element.y + ry, Math.abs(rx), Math.abs(ry), 0, 0, 2*Math.PI);
        context.fillStyle = theme.colors[element.fillColor];
        context.fill();
        //Check for no stroke color --> render rectangle stroke
        if (element.strokeColor !== "transparent") {
            context.strokeStyle = theme.colors[element.strokeColor];
            context.lineWidth = theme.strokes[element.strokeWidth];
            //Check for line dash
            if (element.strokeDash === true) {
                let lineDash = theme.strokes[element.strokeWidth] * 3;
                context.setLineDash([lineDash, lineDash]); //Set default line-dash
            }
            else {
                context.setLineDash([]); //Clear line-dash style
            }
            //Apply stroke
            context.stroke();
        }
        context.globalAlpha = 1; //Reset opacity
    },
    "update": function () {
        return null; //Nothing to do
    }
};

