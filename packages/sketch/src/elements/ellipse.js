import {colors, strokes} from "../defaults.js";

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
    "draw": function (element, context) {
        let rx = element.width / 2;
        let ry = element.height / 2;
        context.beginPath();
        context.globalAlpha = element.opacity;
        context.ellipse(element.x + rx, element.y + ry, Math.abs(rx), Math.abs(ry), 0, 0, 2*Math.PI);
        context.fillStyle = colors[element.fillColor];
        context.fill();
        //Check for no stroke color --> render rectangle stroke
        if (element.strokeColor !== "transparent") {
            context.strokeStyle = colors[element.strokeColor];
            context.lineWidth = strokes[element.strokeWidth];
            //Check for line dash
            if (element.strokeDash === true) {
                context.setLineDash([6, 6]); //Set default line-dash
            }
            else {
                context.setLineDash([]); //Clear line-dash style
            }
            context.stroke();
        }
        context.globalAlpha = 1; //Reset opacity
    }
};

