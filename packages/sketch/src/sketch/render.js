import {drawElement} from "./elements/index.js";
import {resizeRadius, getResizePoints} from "./resize.js";
import {theme} from "./theme.js";
import {getAbsolutePositions, forEachRev} from "./util.js";

//Render sketch
export function renderSketch (context, elements, state) {
    context.clearRect(0, 0, state.width, state.height); //Clear canvas
    //Check for drawing the grid
    //if (state.grid === true) {
    //    context.beginPath();
    //    context.setLineDash([]);
    //    context.strokeStyle = theme.gridColor;
    //    context.lineWidth = theme.gridWidth; 
    //    //Horizontal rules
    //    for (let i = 0; i * state.gridSize < state.height; i++) {
    //        context.moveTo(0, i * state.gridSize);
    //        context.lineTo(state.width, i * state.gridSize);
    //    }
    //    //Vertical rules
    //    for (let i = 0; i * state.gridSize < state.width; i++) {
    //        context.moveTo(i * state.gridSize, 0);
    //        context.lineTo(i * state.gridSize, state.height);
    //    }
    //    //Draw the grid
    //    context.stroke();
    //}
    //this.elements.forEach(function (element, index) {
    forEachRev(elements, function (element, index) {
        drawElement(context, element);
        //Check if this element is selected --> draw selection area
        if (element.selected === true && element.type !== "selection") {
            let [xStart, xEnd] = getAbsolutePositions(element.x, element.width);
            let [yStart, yEnd] = getAbsolutePositions(element.y, element.height);
            context.beginPath();
            context.setLineDash([8, 4]);
            context.strokeStyle = theme.resizeColor; //selectionColor;
            context.lineWidth = theme.resizeWidth; //Force line width to 2px
            context.rect(xStart, yStart, xEnd - xStart, yEnd - yStart);
            context.stroke();
            context.setLineDash([]); //Reset line-dash
            //Check if is the unique selected elements
            if (state.selection.length === 1) {
                return getResizePoints(element).forEach(function (point) {
                    context.beginPath();
                    context.fillStyle = theme.resizeColor; //selectionColor;
                    context.arc(point.x, point.y, resizeRadius, 0, 2*Math.PI);
                    context.fill();
                });
            }
        }
    });
    return null;
}

