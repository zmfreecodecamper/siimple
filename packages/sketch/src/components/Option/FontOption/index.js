import React from "react";
import {classNames} from "@siimple/neutrine";
import {ForEach} from "@siimple/neutrine";
import {Option} from "../index.js";
import {theme} from "../../../sketch/theme.js";
import style from "./style.scss";

//Export Font picker option
export function FontOption (props) {
    let fonts = Object.keys(theme.fontFamilies); //Get available font families
    return (
        <Option title={props.title}>
            <div className={style.root}>
                <ForEach items={fonts} render={function (name, index) {
                    //Return the font item element
                    return React.createElement("div", {
                        "className": classNames({
                            [style.item]: true,
                            [style.itemActive]: name === props.value
                        }),
                        "onClick": function () {
                            return props.onChange(name); //Change font
                        },
                        "style": {
                            "fontFamily": theme["fontFamilies"][name]
                        },
                        "key": index
                    }, "ab");
                }} />
            </div>
        </Option>
    );
}

