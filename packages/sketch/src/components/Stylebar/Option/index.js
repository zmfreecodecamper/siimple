import React from "react";
import style from "./style.scss";

//Export option wrapper
export function Option (props) {
    return (
        <div className={style.root}>
            <div className={style.title}>{props.title}</div>
            <div align="left">
                {props.children}
            </div>
        </div>
    );
}

