import React from "react";
import kofi from "kofi";
import {global} from "@siimple/neutrine";
import {If, Renderer} from "@siimple/neutrine";
//import {Side, SideBackground, SideContent} from "@siimple/neutrine";
import {Content} from "@siimple/neutrine";

import {Sketch, defaultSketchOptions} from "../../components/Sketch/index.js";
import {exportAsPNG} from "../../sketch/export.js";
import {blobToFile, blobToClipboard} from "../../utils.js";

//Export editor component
export class Editor extends React.Component {
    constructor(props) {
        super(props);
        //Initial state
        this.state = {
            "sketch": {},
            "gridStyle": defaultSketchOptions.gridStyle,
            "gridSize": defaultSketchOptions.gridSize
        };
        //Referenced elements
        this.sketch = React.createRef();
        //Bind mehtods
        this.handleExport = this.handleExport.bind(this);
        this.handleScreenshot = this.handleScreenshot.bind(this);
    }
    //Component did mount --> add listeners and import sketch data
    componentDidMount() {
        //TODO: import sketch data
    }
    //Handle action change
    handleActionChange(name) {
        return this.setState({
            "action": name
        });
    }
    //Handle export toggle
    handleExportToggle() {
        if (this.state.showExportWindow === true) {
            return this.setState({"showExportWindow": false});
        }
        let currentSketch = this.sketch.current.export(); //Get current sketch object
        //TODO: check for exporting empty sketch
        //Open export window and update the sketch element
        return this.setState({
            //"sketch": this.sketch.current.export(), //Update sketch object
            "sketch": currentSketch,
            "showExportWindow": true
        });
    }
    //Handle sketch export
    handleExport(options) {
        let self = this;
        let sketch = this.sketch.current.export(); //Get current sketch object
        //console.log(sketch);
        //Prepare the export options
        let exportOptions = {
            "crop": null //Disable crop
        };
        //Export sketch as PNG image
        return exportAsPNG(sketch, exportOptions, function (blob) {
            return blobToFile(blob, `export-${kofi.timestamp("YYYY-MM-DD")}.png`);
        });
    }
    //Handle screenshot
    handleScreenshot(region) {
        let sketch = this.sketch.current.export(); //Get current sketch object
        //Initialize export options
        let options = {
            "crop": region //Add region to crop the original sketch
        };
        //Generate the screenshot and export as png image
        return exportAsPNG(sketch, options, function (blob) {
            return blobToFile(blob, "screenshot.png");
        });
    }
    //Render the editor
    render() {
        let self = this; 
        return (
            <React.Fragment>
                {/* Render sketch component */}
                <Renderer render={function () {
                    return React.createElement(Sketch, {
                        "ref": self.sketch,
                        "gridSize": self.state.gridSize,
                        "gridStyle": self.state.gridStyle,
                        "showMenu": true,
                        "showSaveBtn": false,
                        "sketch": self.state.sketch,
                        "onScreenshot": self.handleScreenshot,
                        "onExport": self.handleExport
                    });
                }} />
            </React.Fragment>
        );
    }
}



