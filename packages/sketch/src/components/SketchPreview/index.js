import React from "react";

import {renderSketch} from "../../sketch/render.js";
import {createCanvas} from "../../sketch/scene.js";
import style from "./style.scss";

//Export preview sketch component
export class SketchPreview extends React.Component {
    constructor(props) {
        super(props);
        //Referended elements
        this.parent = React.createRef();
        this.canvas = null; //Reference to canvas element
    }
    //Component dod mount --> render sketch preview
    componentDidMount() {
        let parent = this.parent.current;
        let sketch = this.props.sketch; //Get sketch configuration
        let scale = parent.offsetWidth / sketch.width; //Get scale value
        this.canvas = createCanvas(scale * sketch.width, scale * sketch.height);
        parent.appendChild(this.canvas); //Append new canvas to parent
        let context = this.canvas.getContext("2d"); //Get canvas context
        context.scale(scale, scale); //Set canvas scale
        renderSketch(context, sketch.elements, {
            "grid": false,
            "width": sketch.width,
            "height": sketch.height
        });
    }
    //Render the preview wrapper
    render() {
        return React.createElement("div", {
            "className": style.root,
            "ref": this.parent
        });
    }
}

