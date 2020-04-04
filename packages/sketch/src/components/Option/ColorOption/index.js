import React from "react";
import {classNames} from "@siimple/neutrine";
import {Renderer, ForEach, If} from "@siimple/neutrine";
import {Icon} from "@siimple/neutrine";
import {theme} from "../../../sketch/theme.js";
import {Option} from "../index.js";
import style from "./style.scss";

//Get text color
let getTextColor = function (name) {
    if (name === "transparent" || name === "light" || name === "white") {
        return theme.colors.dark; //Return dark text color
    }
    //Default: return white color
    return "#ffffff";
};

//Export color picker option
export function ColorOption (props) {
    let colorNames = Object.keys(theme.colors);
    return (
        <Option title={props.title}>
            <div className={style.root}>
                <ForEach items={colorNames} render={function (name, index) {
                    //Build class list
                    let classStyle = classNames({
                        [style.item]: true,
                        [style.transparent]: name === "transparent"
                    });
                    //Handle color click
                    let handleClick = function () {
                        return props.onChange(name); //Change color
                    };
                    //Build inline style
                    let inlineStyle = {
                        "backgroundColor": theme.colors[name],
                        "color": getTextColor(name)
                    };
                    return (
                        <div key={index} className={classStyle} onClick={handleClick} style={inlineStyle}>
                            <If condition={name === props.value}>
                                <Icon icon="check" className={style.icon} />
                            </If>
                        </div>
                    );
                }} />
            </div>
        </Option>
    );
}

