import {forEachRev} from "../utils.js";
import {drawGrid} from "./grid.js";
import {drawElement} from "./elements.js";
import {getResizePoints} from "./resize.js";
import {getStartPosition, getEndPosition} from "./math.js";
import {resizeColor, resizeRadius, resizeWidth} from "./defaults.js";

//Render sketch elements
export function renderSketch (canvas, elements, options) {
    let context = canvas.getContext("2d"); //Get canvas context
    let selection = (typeof options.selection === "object") ? options.selection : [];
    context.clearRect(0, 0, options.width, options.height); //Clear canvas
    //Render the grid if available
    if (options.grid === true) {
        drawGrid(context, options.width, options.height, options.gridSize);
    }
    //this.elements.forEach(function (element, index) {
    forEachRev(elements, function (element, index) {
        drawElement(element, context);
        //Check if this element is selected --> draw selection area
        if (element.selected === true && element.type !== "selection") {
            let xStart = getStartPosition(element.x, element.width);
            let yStart = getStartPosition(element.y, element.height);
            let xEnd = getEndPosition(element.x, element.width); // - xStart;
            let yEnd = getEndPosition(element.y, element.height); // - yStart;
            context.beginPath();
            context.setLineDash([8, 4]);
            context.strokeStyle = resizeColor; //selectionColor;
            context.lineWidth = resizeWidth; //Force line width to 2px
            context.rect(xStart, yStart, xEnd - xStart, yEnd - yStart);
            context.stroke();
            context.setLineDash([]); //Reset line-dash
            //Check if is the unique selected elements
            if (selection.length === 1) {
                return getResizePoints(element).forEach(function (point) {
                    context.beginPath();
                    context.fillStyle = resizeColor; //selectionColor;
                    context.arc(point.x, point.y, resizeRadius, 0, 2*Math.PI);
                    context.fill();
                });
            }
        }
    });
    return null;
}


