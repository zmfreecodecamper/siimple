import React from "react";
import {classNames} from "@siimple/neutrine";
import {Icon} from "@siimple/neutrine";
import style from "./style.scss";

//Export button component
export function Button (props) {
    //Build classlist
    let classList = classNames(props.className, {
        [style.root]: true,
        [style.active]: props.active === true
    });
    //Return the button component
    return (
        <div className={classList} onClick={props.onClick}>
            <Icon className={style.icon} icon={props.icon} />
        </div>
    );
}

Button.defaultProps = {
    "active": false,
    "icon": null
};

