import React from "react";
import {classNames} from "@siimple/neutrine";
import style from "./style.scss";

//Export dialog component
export function Dialog (props) {
    if (props.active === false) {
        return null; //Dialog is not active
    }
    //Build the wrapper classnames
    let classList = classNames({
        [style.root]: true,
        [style.left]: props.orientation === "left",
        [style.right]: props.orientation === "right"
    });
    //Return the dialog wrapper
    return (
        <div className={classList} style={props.style}>
            {props.children}
        </div>
    );
}

//Dialog props
Dialog.defaultProps = {
    "active": false,
    "orientation": "left"
};


