import {colors, strokes} from "../defaults.js";
import {getStartPosition, getEndPosition} from "../utils/math.js";

//Export rectangle element
export const rectangleElement = {
    "icon": "square",
    "visibleOnToolbar": true,
    "initialConfig": {
        "fillColor": "transparent",
        "strokeColor": "dark",
        "strokeWidth": "small",
        "radius": 5,
        "opacity": 1.0
    },
    "draw": function (element, context, rc) {
        //Get real positions
        let xStart = getStartPosition(element.x, element.width); //Real x start position
        let yStart = getStartPosition(element.y, element.height); //Real y start position
        let xEnd = getEndPosition(element.x, element.width); //Real y end position
        let yEnd = getEndPosition(element.y, element.height); //Real y end position
        context.beginPath();
        context.globalAlpha = element.opacity;
        //context.rect(element.x, element.y, element.width, element.height);
        context.moveTo(xStart + element.radius, yStart);
        context.lineTo(xEnd- element.radius, yStart);
        context.quadraticCurveTo(xEnd, yStart, xEnd, yStart + element.radius);
        context.lineTo(xEnd, yEnd - element.radius);
        context.quadraticCurveTo(xEnd, yEnd, xEnd - element.radius, yEnd);
        context.lineTo(xStart + element.radius, yEnd);
        context.quadraticCurveTo(xStart, yEnd, xStart, yEnd - element.radius);
        context.lineTo(xStart, yStart + element.radius);
        context.quadraticCurveTo(xStart, yStart, xStart + element.radius, yStart);
        context.closePath();
        context.fillStyle = colors[element.fillColor];
        context.fill();
        //Check for no stroke color --> render rectangle stroke
        if (element.strokeColor !== "transparent") {
            context.strokeStyle = colors[element.strokeColor];
            context.lineWidth = strokes[element.strokeWidth];
            context.setLineDash([]); //Clear line-dash style
            context.stroke();
        }
        context.globalAlpha = 1; //Reset opacity
    }
};

