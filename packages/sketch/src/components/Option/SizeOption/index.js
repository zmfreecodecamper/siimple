import React from "react";
import {classNames} from "@siimple/neutrine";
import {Renderer, ForEach, If} from "@siimple/neutrine";
import {Heading} from "@siimple/neutrine";
import {Icon} from "@siimple/neutrine";
import {Option} from "../index.js";
import style from "./style.scss";

//List with all availbale sizes
let sizes = ["small", "medium", "large", "extra-large"];

//Icon sizes
let iconSizes = {
    "small": "15px",
    "medium": "18px",
    "large": "21px",
    "extra-large": "24px"
};

//Export Size picker option
export function SizeOption (props) {
    return (
        <Option title={props.title}>
            <div className={style.root}>
                <ForEach items={sizes} render={function (name, index) {
                    //Item class list
                    let itemClass = classNames({
                        [style.item]: true,
                        [style.itemActive]: name === props.value
                    });
                    //Handle stroke click
                    let handleClick = function () {
                        return props.onChange(name); //Change size
                    };
                    return (
                        <div key={index} className={itemClass} onClick={handleClick}>
                            <Icon icon={props.icon} size={iconSizes[name]} className={style.itemIcon} />
                        </div>
                    );
                }} />
            </div>
        </Option>
    );
}

SizeOption.defaultProps = {
    "title": null,
    "icon": "minus"
};


