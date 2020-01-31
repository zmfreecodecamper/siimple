import React from "react";
import {classNames} from "@siimple/neutrine";
import {If, Renderer} from "@siimple/neutrine";
import {Range} from "@siimple/neutrine";
import {Button} from "../Button/index.js";
import {Dialog} from "../Dialog/index.js";
import {ColorOption} from "./ColorOption/index.js";
import {SizeOption} from "./SizeOption/index.js";
import {TextOption} from "./TextOption/index.js";
import {RangeOption} from "./RangeOption/index.js";
import {SwitchOption} from "./SwitchOption/index.js";
import style from "./style.scss";

//Check if the provided key exists
let notUndef = function (value) {
    return typeof value !== "undefined";
};

//Reload state
let reloadState = function (props, state) {
    let newState = {
        "showFillOption": false,
        "showStrokeOption": false,
        "showTextOption": false,
        "showOpacityOption": false,
        "showRadiusOption": false
    };
    //Check the number of selected elements
    if (props.selection.length === 1) {
        let element = props.selection[0];
        Object.assign(newState, {
            "showTextOption": notUndef(element["textContent"]),
            "showFillOption": notUndef(element["fillColor"]),
            "showStrokeOption": notUndef(element["strokeColor"]),
            "showOpacityOption": notUndef(element["opacity"]),
            "showRadiusOption": notUndef(element["radius"])
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
                                "icon": "font",
                                "active": current === "text",
                                "onClick": self.handleOptionChange("text")
                            });
                        }} />
                        <Dialog active={current === "text"}>
                            <Renderer render={function () {
                                return React.createElement(SizeOption, {
                                    "icon": "font",
                                    "title": "Text size",
                                    "onChange": self.handleValueChange("textSize"),
                                    "value": self.props.selection[0].textSize
                                });
                            }} />
                            <Renderer render={function () {
                                return React.createElement(ColorOption, {
                                    "title": "Text Color",
                                    "onChange": self.handleValueChange("textColor"),
                                    "value": self.props.selection[0].textColor
                                });
                            }} />
                            <Renderer render={function () {
                                return React.createElement(TextOption, {
                                    "title": "Text content",
                                    "onChange": self.handleValueChange("textContent"),
                                    "value": self.props.selection[0].textContent
                                });
                            }} />
                        </Dialog>
                    </div>
                </If>
                {/* Render element fill option */}
                <If condition={this.state.showFillOption}>
                    <div className={style.item}>
                        <Renderer render={function () {
                            return React.createElement(Button, {
                                "icon": "fill",
                                "active": current === "fill",
                                "onClick": self.handleOptionChange("fill")
                            });
                        }} />
                        <Dialog active={current === "fill"}>
                            <Renderer render={function () {
                                return React.createElement(ColorOption, {
                                    "title": "Fill Color",
                                    "onChange": self.handleValueChange("fillColor"),
                                    "value": self.props.selection[0].fillColor
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
                            <Renderer render={function () {
                                return React.createElement(SwitchOption, {
                                    "title": "Stroke dash",
                                    "onChange": self.handleValueChange("strokeDash"),
                                    "value": self.props.selection[0].strokeDash
                                });
                            }} />
                        </Dialog>
                    </div>
                </If>
                {/* Render element radius */}
                <If condition={this.state.showRadiusOption}>
                    <div className={style.item}>
                        <Renderer render={function () {
                            return React.createElement(Button, {
                                "icon": "corner",
                                "active": current === "radius",
                                "onClick": self.handleOptionChange("radius")
                            });
                        }} />
                        <Dialog active={current === "radius"}>
                            <Renderer render={function () {
                                return React.createElement(RangeOption, {
                                    "title": "Radius",
                                    "min": 0,
                                    "max": 50,
                                    "step": 1,
                                    "onChange": self.handleValueChange("radius"),
                                    "value": self.props.selection[0].radius
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
                                "icon": "opacity",
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
                {/* Bring to front button */}
                <div className={style.item}>
                    <Renderer render={function () {
                        return React.createElement(Button, {
                            "onClick": function () {
                                return self.props.onOrder("front"); //Move to front
                            },
                            "icon": "bring-forward"
                        });
                    }} />
                </div>
                {/* Send to back button */}
                <div className={style.item}>
                    <Renderer render={function () {
                        return React.createElement(Button, {
                            "onClick": function () {
                                return self.props.onOrder("back"); //Move to back
                            },
                            "icon": "send-backward"
                        });
                    }} />
                </div>
                {/* Clone current selection */}
                <div className={style.item}>
                    <Button icon="clone" onClick={this.props.onClone} />
                </div>
                {/* Remove current selection */}
                <div className={style.item}>
                    <Button icon="trash" onClick={this.props.onRemove} />
                </div>
            </div>
        );
    }
}


