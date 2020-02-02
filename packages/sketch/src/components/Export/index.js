import React from "react";
import {classNames} from "@siimple/neutrine";
import {ForEach, Renderer} from "@siimple/neutrine";
import {Heading} from "@siimple/neutrine";
import {Icon} from "@siimple/neutrine";
import {Btn} from "@siimple/neutrine";
import {Field, FieldLabel, FieldHelper} from "@siimple/neutrine";
import {Input} from "@siimple/neutrine";

import {SketchPreview} from "../SketchPreview/index.js";
import {exportFormats} from "../../sketch/export.js";
import style from "./style.scss";

//Export Window
export class ExportWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "format": Object.keys(exportFormats)[0]
        };
        //Referenced elements
        this.filename = React.createRef();
        this.preview = React.createRef(); //To store preview canvas
        //Bind methods
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormatChange = this.handleFormatChange.bind(this);
    }
    //Handle format change
    handleFormatChange(name) {
        if (exportFormats[name].available === true) {
            return this.setState({
                "format": name
            });
        }
    }
    //Handle submit
    handleSubmit() {
        let format = exportFormat[this.state.format]; //Get format props
        return this.props.onSubmit({
            "filename": this.filename.current.value.trim() + format.extname,
            "format": this.state.format //Format type
        });
    }
    //Render export window
    render() {
        let self = this;
        let formats = Object.keys(exportFormats); //Get available export pormats
        let extname = exportFormats[this.state.format].extname; //Get selected extname
        return (
            <div className="siimple--px-4 siimple--py-4">
                <Heading type="h4" className="siimple--mb-4">
                    <span>Export image</span>
                </Heading>
                {/* Export formats */}
                <Field>
                    <FieldLabel>Export format</FieldLabel>
                    <div className={style.itemWrapper}>
                        <ForEach items={formats} render={function (name, index) {
                            let item = exportFormats[name];
                            let handleClick = function () {
                                return self.handleFormatChange(name);
                            };
                            let classList = classNames({
                                [style.item]: true,
                                [style.itemActive]: name === self.state.format,
                                [style.itemDisabled]: item.available === false
                            });
                            //Return type button
                            return (
                                <div className={classList} onClick={handleClick} key={index}>
                                    <div className="siimple--mb-0" align="center">
                                        <Icon icon={item.icon} style={{"fontSize":"28px"}} />
                                    </div>
                                    <div align="center">
                                        <strong>{item.label}</strong>
                                    </div>
                                </div>
                            );
                        }} />
                    </div>
                </Field>
                {/* Filename */}
                <Field>
                    <FieldLabel>Filename</FieldLabel>
                    <div className={style.file}>
                        <Renderer render={function () {
                            return React.createElement(Input, {
                                "className": style.fileName,
                                "type": "text",
                                "defaultValue": "export",
                                "ref": self.filename,
                                "fluid": true
                            });
                        }} />
                        <div className={style.fileExt}>{extname}</div>
                    </div>
                </Field>
                <Field>
                    <FieldLabel>Preview</FieldLabel>
                    <Renderer render={function () {
                        return React.createElement(SketchPreview, {
                            "ref": self.preview,
                            "sketch": self.props.sketch
                        });
                    }} />
                </Field>
                <div className="siimple--pt-4">
                    <Btn color="success" onClick={this.handleSubmit}>
                        <strong>Export image</strong>
                    </Btn>
                    <Btn className="siimple--ml-1" onClick={this.props.onCancel}>
                        <span>Cancel</span>
                    </Btn>
                </div>
            </div>
        );
    }
}

