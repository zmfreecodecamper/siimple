import React from "react";
import {classNames} from "@siimple/neutrine";
import {If, Renderer} from "@siimple/neutrine";
import {Range} from "@siimple/neutrine";
import {Button} from "../Button/index.js";
import {ColorOption} from "./ColorOption/index.js";
import {SizeOption} from "./SizeOption/index.js";
import {TextOption} from "./TextOption/index.js";
import {RangeOption} from "./RangeOption/index.js";
import {Dialog} from "./Dialog/index.js";
import style from "./style.scss";

//Check if the provided key exists
let notUndef = function (value) {
    return typeof value !== "undefined";
};

//Reload state
let reloadState = function (props, state) {
    let newState = {
        "showColorOption": false,
        "showStrokeOption": false,
        "showTextOption": false,
        "showOpacityOption": false
    };
    //Check the number of selected elements
    if (props.selection.length === 1) {
        let element = props.selection[0];
        Object.assign(newState, {
            "showTextOption": notUndef(element["text"]),
            "showColorOption": notUndef(element["color"]),
            "showStrokeOption": notUndef(element["strokeColor"]),
            "showOpacityOption": notUndef(element["opacity"])
        });
    }
    //Check to update the current option
    if (typeof state.length === "number") {
        if (state.length !== props.selection.length) {
            Object.assign(newState, {
                "current": "",
                "length": props.selection.length
            });
        }
    }
    //Return the state
    return newState;
};

//Export stylebar wrapper
export class Stylebar extends React.Component {
    constructor(props) {
        super(props);
        //Initial state
        this.state = Object.assign(reloadState(props, {}), {
            "length": this.props.selection.length, 
            "current": ""
        });
        //Bind methods
        //this.handleOpacityChange = this.handleOpacityChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }
    //Updated props
    static getDerivedStateFromProps(props, state) {
        return reloadState(props, state);
    }
    //Handle value change
    handleValueChange(key) {
        let self = this;
        return function (value) {
            //console.log(key + " ---> " + value);
            return self.props.onUpdate(key, value);
        };
    }
    //Handle option change
    handleOptionChange(option) {
        let self = this;
        return function () {
            return self.setState(function (prevState) {
                if (prevState.current === option) {
                    return {"current": ""}; //Reset current
                }
                //Set the new option
                return {"current": option};
            });
        };
    }
    //Render the stylebar
    render() {
        let self = this;
        let current = this.state.current;
        //Stylebar wrapper classnames
        let classList = classNames({
            [style.root]: true,
            [style.active]: this.props.selection.length > 0
        });
        return (
            <div className={classList}>
                {/* Render element text option */}
                <If condition={this.state.showTextOption}>
                    <div className={style.item}>
                        <Renderer render={function () {
                            return React.createElement(Button, {
                                "icon": "text",
                                "active": current === "text",
                                "onClick": self.handleOptionChange("text")
                            });
                        }} />
                        <Dialog active={current === "text"}>
                            <Renderer render={function () {
                                return React.createElement(SizeOption, {
                                    "icon": "text",
                                    "title": "Text size",
                                    "onChange": self.handleValueChange("size"),
                                    "value": self.props.selection[0].size
                                });
                            }} />
                            <Renderer render={function () {
                                return React.createElement(TextOption, {
                                    "title": "Text content",
                                    "onChange": self.handleValueChange("text"),
                                    "value": self.props.selection[0].text
                                });
                            }} />
                        </Dialog>
                    </div>
                </If>
                {/* Render element color option */}
                <If condition={this.state.showColorOption}>
                    <div className={style.item}>
                        <Renderer render={function () {
                            return React.createElement(Button, {
                                "icon": "palette",
                                "active": current === "color",
                                "onClick": self.handleOptionChange("color")
                            });
                        }} />
                        <Dialog active={current === "color"}>
                            <Renderer render={function () {
                                return React.createElement(ColorOption, {
                                    "title": "Color",
                                    "onChange": self.handleValueChange("color"),
                                    "value": self.props.selection[0].color
                                });
                            }} />
                        </Dialog>
                    </div>
                </If>
                {/* Render element stroke option */}
                <If condition={this.state.showStrokeOption}>
                    <div className={style.item}>
                        <Renderer render={function () {
                            return React.createElement(Button, {
                                "icon": "minus",
                                "active": current === "stroke",
                                "onClick": self.handleOptionChange("stroke")
                            });
                        }} />
                        <Dialog active={current === "stroke"}>
                            <Renderer render={function () {
                                return React.createElement(SizeOption, {
                                    "icon": "minus",
                                    "title": "Stroke size",
                                    "onChange": self.handleValueChange("strokeWidth"),
                                    "value": self.props.selection[0].strokeWidth
                                });
                            }} />
                            <Renderer render={function () {
                                return React.createElement(ColorOption, {
                                    "title": "Stroke color",
                                    "onChange": self.handleValueChange("strokeColor"),
                                    "value": self.props.selection[0].strokeColor
                                });
                            }} />
                        </Dialog>
                    </div>
                </If>
                {/* Render element opacity */}
                <If condition={this.state.showOpacityOption}>
                    <div className={style.item}>
                        <Renderer render={function () {
                            return React.createElement(Button, {
                                "icon": "visible",
                                "active": current === "opacity",
                                "onClick": self.handleOptionChange("opacity")
                            });
                        }} />
                        <Dialog active={current === "opacity"}>
                            <Renderer render={function () {
                                return React.createElement(RangeOption, {
                                    "title": "Opacity",
                                    "min": 0,
                                    "max": 1,
                                    "step": 0.1,
                                    "onChange": self.handleValueChange("opacity"),
                                    "value": self.props.selection[0].opacity
                                });
                            }} />
                        </Dialog>
                    </div>
                </If>
                {/* Divider --> only if selection === 1*/}
                <If condition={this.props.selection.length === 1}>
                    <div className={style.divider} />
                </If>
                {/* Remove current selection */}
                <div className={style.item}>
                    <Button icon="trash" onClick={this.props.onRemove} />
                </div>
            </div>
        );
    }
}


