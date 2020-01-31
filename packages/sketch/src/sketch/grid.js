import {gridColor, gridWidth} from "./defaults.js";

//Draw grid
export function drawGrid (context, width, height, size) {
    context.beginPath();
    context.setLineDash([]);
    context.strokeStyle = gridColor;
    context.lineWidth = gridWidth; 
    //Horizontal rules
    for (let i = 0; i * size < height; i++) {
        context.moveTo(0, i * size);
        context.lineTo(width, i * size);
    }
    //Vertical rules
    for (let i = 0; i * size < width; i++) {
        context.moveTo(i * size, 0);
        context.lineTo(i * size, height);
    }
    //Draw the grid
    return context.stroke();
}


