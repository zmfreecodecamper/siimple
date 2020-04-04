import {getAbsolutePositions} from "./util.js";

//Set selection
export function setSelection (selection, elements) {
    //Get selection absolute positions
    let [sxStart, sxEnd] = getAbsolutePositions(selection.x, selection.width);
    let [syStart, syEnd] = getAbsolutePositions(selection.y, selection.height);
    //Mark all selected elements
    elements.forEach(function (element) {
        if (element.type !== "selection") {
            //Get element absolute positions
            let [xStart, xEnd] = getAbsolutePositions(element.x, element.width);
            let [yStart, yEnd] = getAbsolutePositions(element.y, element.height);
            //Set if this element is selected
            element.selected = sxStart <= xStart && syStart <= yStart && xEnd <= sxEnd && yEnd <= syEnd;
        }
    });
}

//Clear selection
export function clearSelection (elements) {
    return elements.forEach(function (element) {
        element.selected = false; //Disable selection
    });
}

//Count selected elements
export function countSelection (elements) {
    let count = 0;
    elements.forEach(function (element) {
        if (element.selected === true) {
            count = count + 1; //Increment the counter
        }
    });
    return count;
}

//Get selected elements
export function getSelection (elements) {
    return elements.filter(function (element) {
        return element.selected;
    });
}

//Create a snapshot of the selection
export function snapshotSelection (elements) {
    return elements.map(function (element) {
        return {
            "x": element.x,
            "y": element.y,
            "width": element.width,
            "height": element.height
        };
    });
}

