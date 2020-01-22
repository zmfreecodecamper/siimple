import React from "react";
import {If, Renderer} from "@siimple/neutrine";

import {Toolbar} from "../Toolbar/index.js";
import {Stylebar} from "../Stylebar/index.js";
import {color} from "../../utils/colors.js";
import {createElement, drawElement} from "../../utils/elements.js";
import {getResizePoints, resizeRadius, inResizePoint} from "../../utils/resize.js";
import {getStartPosition, getEndPosition} from "../../utils/math.js";
import {setSelection, clearSelection, countSelection, getSelection} from "../../utils/selection.js";
import style from "./style.scss";

//Check for arrow keys
let isArrowKey = function (key) {
    return key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight";
};

//Default sketch config
let defaultConfig = {
    "grid": false,
    "gridSize": 5
};

//Export sketch class
export class Sketch extends React.Component {
    constructor(props) {
        super(props);
        this.parent = React.createRef(); //Editor wrapper
        this.canvas = React.createRef(); //Editor canvas
        this.context = null; //this.canvas.getContext("2d"); //Context instance
        //Sketch state
        this.state = {
            "width": 200,
            "height": 200,
            "currentType": "selection"
        };
        //Initialize the view state
        this.view = {
            "currentElement": null,
            "currentElementPrevSelected": false,
            "currentElementDragging": false,
            "currentElementResizing": false,
            "selection": [],
            "dragged": false,
            "grid": false,
            "gridSize": 10,
            "resizeOrientation": null
        };
        //Initialize sketch data
        this.data = Object.assign({}, defaultConfig, {
            "elements": []
        });
        //Bind methods
        this.export = this.export.bind(this);
        this.draw = this.draw.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleElementUpdate = this.handleElementUpdate.bind(this);
        this.handleGridToggle = this.handleGridToggle.bind(this);
        //Selection handlers
        this.removeSelection = this.removeSelection.bind(this);
        this.cloneSelection = this.cloneSelection.bind(this);
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
        window.addEventListener("resize", this.handleResize, false);
        //Initialize the canvas context
        this.context = this.canvas.current.getContext("2d");
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
        window.removeEventListener("resize", this.handleResize, false);
    }
    //Component did update --> reset the context
    componentDidUpdate() {
        this.context = this.canvas.current.getContext("2d");
        this.draw(); //Force canvas redraw
    }
    //Load sketch data
    load(data) {
        this.data = Object.assign({}, defaultConfig, data);
        if (typeof this.data.elements !== "object" || this.data.elements === null) {
            this.data.elements = []; //Prevent no elements list
        }
        //Draw the new data
        return this.draw();
    }
    //Export the current sketch object
    export() {
        return this.data;
    }
    //Draw the sketch
    draw() {
        let self = this;
        let selectionColor = color("darkBlue", "1.0");
        //Clear canvas
        this.context.clearRect(0, 0, this.state.width, this.state.height);
        //Render the grid if available
        if (this.view.grid === true) {
            let gridSize = this.view.gridSize;
            this.context.beginPath();
            this.context.setLineDash([]);
            this.context.strokeStyle = color("light", 1);
            this.context.strokeWidth = "1px";
            //Horizontal rules
            for (let i = 0; i * gridSize < this.state.height; i++) {
                this.context.moveTo(0, i * gridSize);
                this.context.lineTo(this.state.width, i * gridSize);
            }
            //Vertical rules
            for (let i = 0; i * gridSize < this.state.width; i++) {
                this.context.moveTo(i * gridSize, 0);
                this.context.lineTo(i * gridSize, this.state.height);
            }
            this.context.stroke();
        }
        this.data.elements.forEach(function (element, index) {
            drawElement(element, self.context);
            //Check if this element is selected --> draw selection area
            if (element.selected === true && element.type !== "selection") {
                let xStart = getStartPosition(element.x, element.width);
                let yStart = getStartPosition(element.y, element.height);
                let xEnd = getEndPosition(element.x, element.width); // - xStart;
                let yEnd = getEndPosition(element.y, element.height); // - yStart;
                self.context.beginPath();
                self.context.setLineDash([8, 4]);
                self.context.strokeStyle = selectionColor;
                self.context.rect(xStart, yStart, xEnd - xStart, yEnd - yStart);
                self.context.stroke();
                //Check if is the unique selected elements
                if (self.view.selection.length === 1) {
                    return getResizePoints(element).forEach(function (point) {
                        self.context.beginPath();
                        self.context.fillStyle = selectionColor;
                        self.context.arc(point.x, point.y, resizeRadius, 0, 2*Math.PI);
                        self.context.fill();
                    });
                }
            }
        });
    }
    //Clear the sketch
    clear() {
        //Clear the sketch data
        this.data = Object.assign(this.data, {
            "elements": []
        });
        //Draw the sketch
        return this.draw();
    }
    //Handle key down
    handleKeyDown(event) {
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
            if (this.view.grid === true) {
                step = this.view.gridSize;
            }
            //Move selected elements
            this.data.elements.forEach(function (element) {
                if (element.selected === true) {
                    if (event.key === "ArrowUp") {
                        element.y = element.y - step;
                    }
                    else if (event.key === "ArrowDown") {
                        element.y = element.y + step;
                    }
                    else if (event.key === "ArrowLeft") {
                        element.x = element.x - step;
                    }
                    else if (event.key === "ArrowRight") {
                        element.x = element.x + step;
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
        //this.view.selectionCount = 0; //Clear number of selected elements
        //Check if we are in a resize point
        if (this.view.selection.length === 1) {
            let point = inResizePoint(this.view.selection[0], this.view.lastX, this.view.lastY);
            if (point !== null) {
                this.view.currentElement = this.view.selection[0]; //Save current element
                this.view.resizeOrientation = point.orientation; //Save resize orientation
                this.view.currentElementResizing = true; //Resizing element
                return; //Stop event
            }
        }
        //Check the selected type
        if (this.state.currentType === "selection") {
            //Check if the point is inside an element
            let insideElements = this.data.elements.filter(function (element) {
                let xStart = getStartPosition(element.x, element.width);
                let yStart = getStartPosition(element.y, element.height);
                let xEnd = getEndPosition(element.x, element.width);
                let yEnd = getEndPosition(element.y, element.height);
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
                    clearSelection(this.data.elements); //Remove other elements
                }
                //Toggle selection
                el.selected = true;
                //this.state.hasSelection = true; //At least has one selected element
                this.view.selection = getSelection(this.data.elements);
                return; //Stop event
            }
            //If there is no elements --> clear selection
            //else {
            //    clearSelection(this.data.elements);
            //}
        }
        //Create a new element
        let element = createElement({
            "type": this.state.currentType,
            "x": this.view.lastX, 
            "y": this.view.lastY
        });
        this.data.elements.push(element);
        this.view.currentElement = element; //Save dragging element
        this.view.selection = []; //Clear the current selection
        clearSelection(this.data.elements);
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
            let orientation = this.view.resizeOrientation;
            let deltaX = x - this.view.lastX;
            let deltaY = y - this.view.lastY;
            //Check the orientation
            if (orientation === "rh") {
                element.width = element.width + deltaX;
            }
            else if (orientation === "lh") {
                element.x = element.x + deltaX;
                element.width = element.width - deltaX;
            }
            else if (orientation === "bv") {
                element.height = element.height + deltaY;
            }
            else if (orientation === "tv") {
                element.y = element.y + deltaY;
                element.height = element.height - deltaY;
            }
            else if (orientation === "ltd") {
                element.x = element.x + deltaX;
                element.y = element.y + deltaY;
                element.width = element.width - deltaX;
                element.height = element.height - deltaY;
            }
            else if (orientation === "rtd") {
                element.y = element.y + deltaY;
                element.width = element.width + deltaX;
                element.height = element.height - deltaY;
            }
            else if (orientation === "lbd") {
                element.x = element.x + deltaX;
                element.width = element.width - deltaX;
                element.height = element.height + deltaY;
            }
            else if (orientation === "rbd") {
                element.width = element.width + deltaX;
                element.height = element.height + deltaY;
            }
        }
        //Check if we have selected elements
        else if (this.view.currentElementDragging === true && this.view.selection.length > 0) {
            //Move all elements
            this.view.selection.forEach(function (element) {
                element.x = element.x + (x - self.view.lastX);
                element.y = element.y + (y - self.view.lastY);
            });
        }
        //Check if we have a drag element
        else if (this.view.currentElement !== null) {
            let element = this.view.currentElement;
            //Update the element size
            Object.assign(element, {
                "width": x - element.x,
                "height": (event.shiftKey) ? x - element.x : y - element.y
            });
            //Check if the elemement is a selection
            if (element.type === "selection") {
                //Set selected elements and get the new number of selected elements
                setSelection(element, this.data.elements);
            }
        }
        //Update the current x and y positions
        this.view.lastX = x;
        this.view.lastY = y;
        //Update
        return this.draw();
    }
    //Handle mouse up
    handleMouseUp(event) {
        //Check for resizing
        //if (this.view.currentElementResizing === true) {
        //    delete this.view.currentElement.resizing; //Remove resizing attribute
        //}
        //Check for clicked element
        if (this.view.dragged === false && this.view.selection.length > 0) {
            if (this.view.currentElementPrevSelected === true && event.shiftKey) {
                //clearSelection(this.data.elements);
                this.view.currentElement.selected = false;
            }
            //Check if no shift key is pressed --> keep only this current element in selection
            else if (!event.shiftKey) {
                clearSelection(this.data.elements); //Remove other elements from selection
                this.view.currentElement.selected = true;
            }
        }
        //Check for adding a new element
        if (this.state.currentType !== "selection") {
            this.view.currentElement.selected = true; //Set the new element as selected
            //Change the current type to selection
            this.setState({
                "currentType": "selection"
            });
        }
        //Remove selection elements
        this.data.elements = this.data.elements.filter(function (element) {
            return element.type !== "selection";
        });
        //Reset the current drag element
        this.view.currentElement = null;
        this.view.selection = getSelection(this.data.elements); //Update the selection
        this.forceUpdate(); //Force update to display/hide the stylebar
        //Draw
        return this.draw();
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
        clearSelection(this.data.elements); //Remove selection
        this.view.selection = []; //Reset selection 
        return this.setState({
            "currentType": type
        });
    }
    //Handle grid toggle --> Display or hide the grid
    handleGridToggle() {
        this.view.grid = !this.view.grid;
        return this.forceUpdate();
    }
    //Handle element update
    handleElementUpdate() {
        //let element = getSelection(this.data.elements); //Get selected element
        //Update the element value
        //element[key] = value;
        //Redraw the sketch
        return this.draw();
    }
    //Clone the current selection
    cloneSelection() {
        //TODO
    }
    //Remove current selection
    removeSelection() {
        //Remove current selection
        this.data.elements = this.data.elements.filter(function (element) {
            return !element.selected;
        });
        this.view.selection = []; //Remove selection
        this.forceUpdate(); //Hide stylebar
        return this.draw();
    }
    //Render the sketch component
    render() {
        let self = this;
        return (
            <div ref={this.parent} className={style.root}>
                {/* Render canvas */}
                <canvas width={this.state.width} height={this.state.height} ref={this.canvas} />
                {/* Toolbar */}
                <Renderer render={function () {
                    return React.createElement(Toolbar, {
                        "currentElement": self.state.currentType,
                        "gridActive": self.view.grid,
                        "onElementClick": self.handleTypeChange,
                        "onGridClick": self.handleGridToggle
                    });
                }} />
                {/* Stylebar */}
                <Renderer render={function () {
                    return React.createElement(Stylebar, {
                        //"key": self.view.selection.length,
                        "selection": self.view.selection, 
                        "onUpdate": self.handleElementUpdate,
                        "onRemove": self.removeSelection
                    });
                }} />
            </div>
        );
    }
}

