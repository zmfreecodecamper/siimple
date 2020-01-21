import React from "react";
import style from "./style.scss";

//Export dialog component
export function Dialog (props) {
    if (props.active === false) {
        return null; //Dialog is not active
    }
    //Return the dialog wrapper
    return (
        <div className={style.root}>
            {props.render()}
        </div>
    );
}

//Dialog props
Dialog.defaultProps = {
    "active": false
};


