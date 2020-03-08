import React from "react";
import kofi from "kofi";
import {global} from "@siimple/neutrine";
import {If, Renderer} from "@siimple/neutrine";
import {Side, SideBackground, SideContent} from "@siimple/neutrine";
import {Sketch} from "../../components/Sketch/index.js";
import {ExportWindow} from "../../components/Export/index.js";
import {exportAsPNG} from "../../sketch/export.js";
import {blobToFile, blobToClipboard} from "../../utils.js";

//Export editor component
export class Editor extends React.Component {
    constructor(props) {
        super(props);
        //Initial state
        this.state = {
            "sketch": {},
            "showExportWindow": false
        };
        //Referenced elements
        this.sketch = React.createRef();
        //Bind mehtods
        this.handleExportToggle = this.handleExportToggle.bind(this);
        this.handleExportSubmit = this.handleExportSubmit.bind(this);
        this.handleScreenshot = this.handleScreenshot.bind(this);
    }
    //Component did mount --> add listeners and import sketch data
    componentDidMount() {
        //TODO: import sketch data
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
    handleExportSubmit(options) {
        let self = this;
        let sketch = this.state.sketch; //this.sketch.current.export(); //Get current sketch object
        //console.log(sketch);
        //Prepare the export options
        let exportOptions = {
            "crop": null //Disable crop
        };
        //Export sketch as PNG image
        return exportAsPNG(sketch, exportOptions, function (blob) {
            return blobToFile(blob, options.filename);
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
                        "sketch": self.state.sketch,
                        "onExport": self.handleExportToggle,
                        "onScreenshot": self.handleScreenshot
                    });
                }} />
                {/* Export window */}
                <Side visible={this.state.showExportWindow}>
                    <SideBackground onClick={this.handleExportToggle} />
                    <SideContent posiiton="right" size="500px">
                        <If condition={this.state.showExportWindow} render={function () {
                            return React.createElement(ExportWindow, {
                                "sketch": self.state.sketch,
                                "onCancel": self.handleExportToggle,
                                "onSubmit": self.handleExportSubmit
                            });
                        }} />
                    </SideContent>
                </Side>
            </React.Fragment>
        );
    }
}



