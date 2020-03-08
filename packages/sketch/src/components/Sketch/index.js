import React from "react";
import {classNames} from "@siimple/neutrine";
import {If, Renderer} from "@siimple/neutrine";
import {Toolbar} from "../Toolbar/index.js";
import {Stylebar} from "../Stylebar/index.js";
import {Menubar} from "../Menubar/index.js";
import {renderSketch} from "../../sketch/render.js";
import {createElement, updateElement} from "../../sketch/elements.js";
import {getResizePoints, inResizePoint} from "../../sketch/resize.js";
import {setSelection, clearSelection, countSelection, getSelection} from "../../sketch/selection.js";
import {snapshotSelection} from "../../sketch/selection.js";
import {forEachRev, getAbsolutePositions} from "../../utils.js";
import {getDataFromClipboard, blobToDataUrl, calculateImageSize} from "../../utils.js";
import style from "./style.scss";

//Check for arrow keys
let isArrowKey = function (key) {
    return key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight";
};

//Check if the provided event.target is related to an input element
let isInputTarget = function (event) {
    let target = event.target; //Get target element
    return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
    //|| target instanceof HTMLSelectElement;
};

//Parse sketch elements
let parseSketchElements = function (list) {
    if (typeof list !== "object" || list === null || !Array.isArray(list)) {
        return []; //Return an empty list
    }
    //TODO: parse elements
    return list;
};

//Parse clipboard data
let parseClipboardBlob = function (type, blob, callback) {
    //Check for text blob
    if (type === "text") {
        return callback(blob.trim());
    }
    //Convert blob to dataURL
    return blobToDataUrl(blob, callback);
};

//Export sketch class
export class Sketch extends React.Component {
    constructor(props) {
        super(props);
        this.parent = React.createRef(); //Editor wrapper
        this.canvas = React.createRef(); //Editor canvas
        //this.context = null; //this.canvas.getContext("2d"); //Context instance
        //Sketch state
        this.state = {
            "width": 200,
            "height": 200,
            "currentType": "selection",
            "grid": this.props.gridDefault
        };
        //Initialize the view state
        this.view = {
            "currentElement": null,
            "currentElementPrevSelected": false,
            "currentElementDragging": false,
            "currentElementResizing": false,
            "selection": [],
            "snapshot": [],
            "dragged": false,
            "resizeOrientation": null,
            "cursor": null
        };
        //Initialize sketch elements
        this.sketch = null;
        this.elements = parseSketchElements(this.props.sketch.elements);
        //this.theme = getTheme(this.props.sketch.theme); //Get current theme
        //Bind internal methods
        this.gridRound = this.gridRound.bind(this);
        this.draw = this.draw.bind(this);
        //Bind handlers
        this.handleResize = this.handleResize.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleGridToggle = this.handleGridToggle.bind(this);
        this.handleScreenshot = this.handleScreenshot.bind(this);
        //Creating new elements
        this.addElement = this.addElement.bind(this);
        //Selection handlers
        this.resetSelection = this.resetSelection.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
        this.cloneSelection = this.cloneSelection.bind(this);
        this.updateSelection = this.updateSelection.bind(this);
        this.orderSelection = this.orderSelection.bind(this);
        //Bind API methods
        this.export = this.export.bind(this);
        this.clear = this.clear.bind(this);
    }
    //Component did mount --> register event listeners
    componentDidMount() {
        let self = this;
        //Register canvas event listeners
        this.canvas.current.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.current.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.current.addEventListener("mouseup", this.handleMouseUp);
        //Register window/document event listeners
        document.addEventListener("keydown", this.handleKeyDown, false);
        document.addEventListener("paste", this.handlePaste, false);
        window.addEventListener("resize", this.handleResize, false);
        //Initialize the canvas context
        //this.context = this.canvas.current.getContext("2d");
        //Update the canvas with the correct size
        //this.draw();
        this.handleResize();
    }
    //Component will unmount --> remove event listeners
    componentWillUnmount() {
        //Remove canvas listeners
        this.canvas.current.removeEventListener("mousedown", this.handleMouseDown);
        this.canvas.current.removeEventListener("mousemove", this.handleMouseMove);
        this.canvas.current.removeEventListener("mouseup", this.handleMouseUp);
        //Remove window/document listeners
        document.removeEventListener("keydown", this.handleKeyDown, false);
        document.removeEventListener("paste", this.handlePaste, false);
        window.removeEventListener("resize", this.handleResize, false);
    }
    //Component did update --> reset the context
    componentDidUpdate() {
        //this.context = this.canvas.current.getContext("2d");
        this.draw(); //Force canvas redraw
    }
    //Export the current sketch object
    export() {
        return Object.assign({}, this.props.sketch, {
            "elements": this.elements.map(function (element) {
                let exportedElement = Object.assign({}, element, {
                    "selected": false //Disable selection
                });
                //Check for image element --> remove img field
                if (element.type === "image") {
                    delete exporteddElement.img;
                }
                //Return the exported element object
                return exportedElement;
            }),
            "width": this.state.width, //Save current width
            "height": this.state.height //Save current height
        });
    }
    //Grid round
    gridRound(value) {
        return (this.state.grid) ? Math.round(value / this.props.gridSize) * this.props.gridSize : value;
    }
    //Draw the sketch
    draw() {
        return renderSketch(this.canvas.current.getContext("2d"), this.elements, {
            "width": this.state.width,
            "height": this.state.height,
            //"grid": this.state.grid, //Display grid
            //"gridSize": this.props.gridSize, //Set grid size
            "selection": this.view.selection, //Selected elements
            "cursor": this.view.cursor //Current cursor
        });
    }
    //Clear the sketch
    clear() {
        this.elements = []; //Clear sketch elements
        return this.draw();
    }
    //Add a new element
    addElement(element) {
        Object.assign(element, {
            "selected": true, //Set element as selected
            "x": this.gridRound((this.state.width - element.width) / 2),
            "y": this.gridRound((this.state.height - element.height) / 2) 
        });
        this.elements.unshift(element); //Save the new element
        this.view.selection = getSelection(this.elements); //Update the selection
        this.forceUpdate(); //Force update to display/hide the stylebar
    }
    //Handle paste
    handlePaste(event) {
        let self = this;
        console.log(event.target);
        //console.log(event.clipboardData);
        //TODO: check if target is the canvas element
        //Parse clipboard data
        return getDataFromClipboard(event, function (type, blob) {
            //console.log("Copied --> " + type);
            clearSelection(self.elements); //Clear the current selection
            return parseClipboardBlob(type, blob, function (content) {
                let newElement = createElement({
                    "type": type,
                    "content": content
                });
                //Check for not image type
                if (type !== "image") {
                    updateElement(newElement);
                    return self.addElement(newElement);
                }
                //Create a new image
                //https://stackoverflow.com/a/4776378
                let img = new Image();
                img.addEventListener("load", function () {
                    return self.addElement(Object.assign(newElement, {
                        "width": img.width,
                        "height": img.height,
                        "img": img
                    }));
                });
                img.src = content; //Set image source
            });
        });
    }
    //Handle key down
    handleKeyDown(event) {
        let self = this;
        //Check for inpuyt target
        if (isInputTarget(event) === true) {
            return; //stop event processing
        }
        //Check ESCAPE key --> reset selection
        if (event.key === "Escape") {
            event.preventDefault();
            return this.resetSelection(); //Reset selection
        }
        //Check for backspace key --> remove elements
        if (event.key === "Backspace") {
            event.preventDefault();
            return this.removeSelection();
        }
        //Check for arrow keys --> move elements
        else if (isArrowKey(event.key) === true) {
            event.preventDefault();
            let step = (event.shiftKey) ? 5 : 1; //Step value
            //Check if the grid is active
            if (this.state.grid === true) {
                step = this.props.gridSize;
            }
            //Move selected elements
            this.elements.forEach(function (element) {
                if (element.selected === true) {
                    if (event.key === "ArrowUp") {
                        element.y = self.gridRound(element.y - step);
                    }
                    else if (event.key === "ArrowDown") {
                        element.y = self.gridRound(element.y + step);
                    }
                    else if (event.key === "ArrowLeft") {
                        element.x = self.gridRound(element.x - step);
                    }
                    else if (event.key === "ArrowRight") {
                        element.x = self.gridRound(element.x + step);
                    }
                }
            });
            return this.draw();
        }
    }
    //Handle mouse down
    handleMouseDown(event) {
        let self = this;
        //Calculate click positions
        this.view.lastX = event.offsetX; //event.clientX - event.target.offsetLeft;
        this.view.lastY = event.offsetY; //event.clientY - event.target.offsetTop;
        //console.log(`x: ${this.view.lastX}, y: ${this.view.lastY}`);
        //Reset drag state values
        this.view.currentElement = null;
        this.view.currentElementPrevSelected = false;
        this.view.currentElementDragging = false;
        this.view.currentElementResizing = false;
        this.view.dragged = false;
        //this.view.cursor = null; //Reset cursor
        //this.view.selectionCount = 0; //Clear number of selected elements
        //Check if we are in a resize point
        if (this.view.selection.length === 1) {
            let point = inResizePoint(this.view.selection[0], this.view.lastX, this.view.lastY);
            if (point !== null) {
                this.view.currentElement = this.view.selection[0]; //Save current element
                this.view.resizeOrientation = point.orientation; //Save resize orientation
                this.view.currentElementResizing = true; //Resizing element
                this.view.snapshot = snapshotSelection(this.view.selection); //Create a snapshot of the selection
                return; //Stop event
            }
        }
        //Check the selected type
        if (this.state.currentType === "selection") {
            //Check if the point is inside an element
            let insideElements = this.elements.filter(function (element) {
                let [xStart, xEnd] = getAbsolutePositions(element.x, element.width);
                let [yStart, yEnd] = getAbsolutePositions(element.y, element.height);
                //Check if the position is inside the element
                return (xStart <= self.view.lastX && self.view.lastX <= xEnd) 
                    && (yStart <= self.view.lastY && self.view.lastY <= yEnd);
            });
            if (insideElements.length > 0) {
                let el = insideElements[0]; //Get only the first element
                this.view.currentElement = el; //Save the current dragged element
                this.view.currentElementPrevSelected = el.selected; //Save if element is already selected
                this.view.currentElementDragging = true;
                //Check if this element is not selected
                if (el.selected === false && !event.shiftKey) {
                    clearSelection(this.elements); //Remove other elements
                }
                //Toggle selection
                el.selected = true;
                //this.state.hasSelection = true; //At least has one selected element
                this.view.selection = getSelection(this.elements);
                this.view.snapshot = snapshotSelection(this.view.selection); //Create a snapshot of the selection
                return; //Stop event
            }
            //If there is no elements --> clear selection
            //else {
            //    clearSelection(this.elements);
            //}
        }
        //Create a new element
        let element = createElement({
            "type": this.state.currentType,
            "x": this.gridRound(this.view.lastX), 
            "y": this.gridRound(this.view.lastY)
        });
        //this.elements.push(element);
        this.elements.unshift(element);
        this.view.currentElement = element; //Save dragging element
        this.view.selection = []; //Clear the current selection
        clearSelection(this.elements);
        //if (this.state.currentType === "screenshot") {
        //    Object.assign(this.view.cursor, {
        //        "x": element["x"],
        //        "y": element["y"],
        //        "width": 0,
        //        "height": 0
        //    });
        //}
        this.forceUpdate(); //Force update to hide stylebar
    }
   //Handle mouse move
    handleMouseMove(event) {
        if (this.view.currentElement === null) {
            return;
        }
        let self = this;
        let x = event.offsetX; //event.clientX - event.target.offsetLeft;
        let y = event.offsetY; //event.clientY - event.target.offsetTop;
        this.view.dragged = true;
        //Check if we are resizing the element
        if (this.view.currentElementResizing === true) {
            let element = this.view.currentElement;
            let snapshot = this.view.snapshot[0]; //Get snapshot of the current element
            let orientation = this.view.resizeOrientation;
            let deltaX = x - this.view.lastX;
            let deltaY = y - this.view.lastY;
            //Check the orientation
            if (orientation === "rh") {
                element.width = this.gridRound(snapshot.width + deltaX);
            }
            else if (orientation === "lh") {
                element.x = this.gridRound(snapshot.x + deltaX);
                element.width = this.gridRound(snapshot.width - deltaX);
            }
            else if (orientation === "bv") {
                element.height = this.gridRound(snapshot.height + deltaY);
            }
            else if (orientation === "tv") {
                element.y = this.gridRound(snapshot.y + deltaY);
                element.height = this.gridRound(snapshot.height - deltaY);
            }
            else if (orientation === "ltd") {
                element.x = this.gridRound(snapshot.x + deltaX);
                element.y = this.gridRound(snapshot.y + deltaY);
                element.width = this.gridRound(snapshot.width - deltaX);
                element.height = this.gridRound(snapshot.height - deltaY);
            }
            else if (orientation === "rtd") {
                element.y = this.gridRound(snapshot.y + deltaY);
                element.width = this.gridRound(snapshot.width + deltaX);
                element.height = this.gridRound(snapshot.height - deltaY);
            }
            else if (orientation === "lbd") {
                element.x = this.gridRound(snapshot.x + deltaX);
                element.width = this.gridRound(snapshot.width - deltaX);
                element.height = this.gridRound(snapshot.height + deltaY);
            }
            else if (orientation === "rbd") {
                element.width = this.gridRound(snapshot.width + deltaX);
                element.height = this.gridRound(snapshot.height + deltaY);
            }
        }
        //Check if we have selected elements
        else if (this.view.currentElementDragging === true && this.view.selection.length > 0) {
            //Move all elements
            this.view.selection.forEach(function (element, index) {
                element.x = self.gridRound(self.view.snapshot[index].x + (x - self.view.lastX));
                element.y = self.gridRound(self.view.snapshot[index].y + (y - self.view.lastY));
            });
        }
        //Check if we have a drag element
        else if (this.view.currentElement !== null) {
            let element = this.view.currentElement;
            //Check for text element
            if (element.type === "text") {
                Object.assign(element, {"x": x, "y": y}); //Update only text position
            }
            else {
                let deltaX = this.gridRound(x - element.x);
                //let deltaY = this.gridRound(y - element.y);
                Object.assign(element, {
                    "width": deltaX,
                    "height": (event.shiftKey) ? deltaX : this.gridRound(y - element.y)
                });
                //Check if the elemement is a selection
                if (element.type === "selection") {
                    //Set selected elements and get the new number of selected elements
                    setSelection(element, this.elements);
                }
            }
        }
        //Update the current x and y positions
        //this.view.lastX = x;
        //this.view.lastY = y;
        //Update
        return this.draw();
    }
    //Handle mouse up
    handleMouseUp(event) {
        //Check for no current element active
        if (this.view.currentElement === null) {
            return; //Do not process mouse-up event
        }
        //Check for resizing
        //if (this.view.currentElementResizing === true) {
        //    delete this.view.currentElement.resizing; //Remove resizing attribute
        //}
        //Check for clicked element
        if (this.view.dragged === false && this.view.selection.length > 0) {
            if (this.view.currentElementPrevSelected === true && event.shiftKey) {
                //clearSelection(this.elements);
                this.view.currentElement.selected = false;
            }
            //Check if no shift key is pressed --> keep only this current element in selection
            else if (!event.shiftKey) {
                clearSelection(this.elements); //Remove other elements from selection
                this.view.currentElement.selected = true;
            }
        }
        //Check for adding a new element
        if (this.state.currentType !== "selection" && this.state.currentType !== "screenshot") {
            this.view.currentElement.selected = true; //Set the new element as selected
            updateElement(this.view.currentElement); //Update the current element
        }
        //Remove selection elements
        this.elements = this.elements.filter(function (element) {
            return element.type !== "selection" && element.type !== "screenshot";
        });
        //Check for screenshot element
        if (this.state.currentType === "screenshot") {
            this.handleScreenshot(Object.assign({}, this.view.currentElement));
        }
        //Change the current type to selection
        if (this.state.currentType !== "selection") {
            this.setState({
                "currentType": "selection"
            });
        }
        //Reset the current drag element
        this.view.currentElement = null;
        this.view.selection = getSelection(this.elements); //Update the selection
        this.forceUpdate(); //Force update to display/hide the stylebar
        //Draw
        //return this.draw();
    }
    //Handle resize --> update the canvas width and height
    handleResize(event) {
        return this.setState({
            "width": this.parent.current.offsetWidth,
            "height": this.parent.current.offsetHeight
        });
    }
    //Handle type change 
    handleTypeChange(type) {
        clearSelection(this.elements); //Remove selection
        this.view.selection = []; //Reset selection 
        return this.setState({
            "currentType": type
        });
    }
    //Handle grid toggle --> Display or hide the grid
    handleGridToggle() {
        return this.setState({
            "grid": !this.state.grid
        });
    }
    //Handle screenshot
    handleScreenshot(element) {
        if (typeof this.props.onScreenshot !== "function") {
            return null; //Nothing to do
        }
        //Calculate absolute positions
        let [xStart, xEnd] = getAbsolutePositions(element.x, element.width);
        let [yStart, yEnd] = getAbsolutePositions(element.y, element.height);
        //Process the screenshot
        return this.props.onScreenshot({
            "x": xStart,
            "width": xEnd - xStart,
            "y": yStart,
            "height": yEnd - yStart
        });
    }
    //Handle selection update
    updateSelection(key, value) {
        this.view.selection.forEach(function (element) {
            element[key] = value; //Update the element key
            updateElement(element); //Update the element
        });
        //Redraw the sketch
        //return this.draw();
        this.forceUpdate(); //Update + redraw
    }
    //Clone the current selection
    cloneSelection() {
        let self = this;
        let newElements = [];
        //Update the selection with the cloned elements
        this.view.selection = this.view.selection.map(function (element) {
            let clonedElement = Object.assign({}, element, {
                "x": element.x + 5,
                "y": element.y + 5
            });
            //self.elements.push(clonedElement); //Save to the elements list
            newElements.push(clonedElement); //Save to the elements list
            element.selected = false; //Remove this element from selection
            return clonedElement; //Add to selection
        });
        //Add new elements
        forEachRev(newElements, function (element) {
            self.elements.unshift(element);
        });
        this.forceUpdate(); //Update
    }
    //Remove current selection
    removeSelection() {
        //Remove current selection
        this.elements = this.elements.filter(function (element) {
            return !element.selected;
        });
        this.view.selection = []; //Remove selection
        this.forceUpdate(); //Hide stylebar
        //return this.draw();
    }
    //Reorder the selection
    orderSelection(position) {
        let self = this;
        let elements = this.elements; //Reference to elements list
        //this.view.selection.forEach(function (element) {
        forEachRev(this.view.selection, function (element) {
            let index = -1;
            for (let i = 0; i < elements.length; i++) {
                if (element.id === elements[i].id) {
                    index = i; //Save the element index
                    break;
                }
            }
            //TODO: check for not found element????
            //Move the elment to back
            if (position === "back" && index + 1 < elements.length) {
                elements.splice(index, 0, elements.splice(index + 1, 1)[0]);
            }
            //Move the element to front
            else if (position === "front" && index - 1 >= 0) {
                elements.splice(index, 0, elements.splice(index - 1, 1)[0]);
            }
        });
        return this.draw(); //Only draw
    }
    //Reset the selection
    resetSelection() {
        this.elements.forEach(function (element) {
            element.selected = false; //Set selected as false
        });
        this.view.selection = []; //Clear selection list
        this.forceUpdate(); //Hide stylebar
    }
    //Render the sketch component
    render() {
        let self = this;
        let props = this.props;
        //Build root component class list
        let classList = classNames({
            [style.canvas]: true,
            [style.canvasLined]: this.state.grid && props.gridStyle === "lined",
            [style.canvasDotted]: this.state.grid && props.gridStyle === "dotted"
        });
        //Build style list
        let styleList = {
            "backgroundSize": `${props.gridSize}px ${props.gridSize}px`
        };
        if (props.gridStyle === "dotted") {
            styleList["backgroundPositionX"] = `-${props.gridSize / 2}px`;
            styleList["backgroundPositionY"] = `-${props.gridSize / 2}px`;
        }
        return (
            <div ref={this.parent} className={style.root}>
                {/* Render canvas */}
                <div className={classList} style={styleList}>
                    <Renderer render={function () {
                        return React.createElement("canvas", {
                            "width": self.state.width,
                            "height": self.state.height,
                            "ref": self.canvas
                        });
                    }} />
                </div>
                {/* Menubar */}
                <Renderer render={function () {
                    return React.createElement(Menubar, {
                        "showSettingsBtn": self.props.showSettingsBtn,
                        "showSaveBtn": self.props.showSaveBtn,
                        "showExportBtn": self.props.showExportBtn,
                        "onExportClick": self.props.onExport,
                        "onSaveClick": self.props.onSave
                    });
                }} />
                {/* Toolbar */}
                <Renderer render={function () {
                    return React.createElement(Toolbar, {
                        "currentElement": self.state.currentType,
                        "gridActive": self.state.grid,
                        "onElementClick": self.handleTypeChange,
                        "onGridClick": self.handleGridToggle
                    });
                }} />
                {/* Stylebar */}
                <Renderer render={function () {
                    return React.createElement(Stylebar, {
                        //"key": self.view.selection.length,
                        "selection": self.view.selection, 
                        "onUpdate": self.updateSelection,
                        "onClone": self.cloneSelection,
                        "onRemove": self.removeSelection,
                        "onOrder": self.orderSelection
                    });
                }} />
            </div>
        );
    }
}

//Sketch default props
Sketch.defaultProps = {
    "sketch": {}, //Initial sketch data
    //Grid configuration
    "gridStyle": "lined", //Grid style: lined or dotted
    "gridSize": 10, //Grid size
    "gridDefault": false, //By default grid is enabled
    //Displaying sketch buttons
    "showSettingsBtn": true,
    "showSaveBtn": true,
    "showExportBtn": true,
    "showGridBtn": true,
    "showScreenshotBtn": true,
    //Handle sketch actions
    "onExport": null, //Handle sketch export
    "onScreenshot": null, //Handle screenshot
    "onSave": null //Handle sketch save
};

