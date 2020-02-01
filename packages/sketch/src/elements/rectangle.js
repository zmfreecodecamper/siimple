import {theme} from "../theme.js";
import {getAbsolutePositions} from "../utils.js";

//Export rectangle element
export const rectangleElement = {
    "icon": "square",
    "visibleOnToolbar": true,
    "initialConfig": {
        "fillColor": "transparent",
        "strokeColor": "dark",
        "strokeWidth": "small",
        "strokeDash": false,
        "radius": 5,
        "opacity": 1.0
    },
    "draw": function (context, element) {
        //Get real positions
        let [xStart, xEnd] = getAbsolutePositions(element.x, element.width); //Real x positions
        let [yStart, yEnd] = getAbsolutePositions(element.y, element.height); //Real y positions
        let radius = Math.min(element.radius, Math.abs(element.width) / 2, Math.abs(element.height) / 2); //Get max radius
        context.beginPath();
        context.globalAlpha = element.opacity;
        //context.rect(element.x, element.y, element.width, element.height);
        context.moveTo(xStart + radius, yStart);
        context.lineTo(xEnd - radius, yStart);
        context.quadraticCurveTo(xEnd, yStart, xEnd, yStart + radius);
        context.lineTo(xEnd, yEnd - radius);
        context.quadraticCurveTo(xEnd, yEnd, xEnd - radius, yEnd);
        context.lineTo(xStart + radius, yEnd);
        context.quadraticCurveTo(xStart, yEnd, xStart, yEnd - radius);
        context.lineTo(xStart, yStart + radius);
        context.quadraticCurveTo(xStart, yStart, xStart + radius, yStart);
        context.closePath();
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

