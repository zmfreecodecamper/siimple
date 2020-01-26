import React from "react";
import {Renderer} from "@siimple/neutrine";
import {Switch} from "@siimple/neutrine";
import {Option} from "../Option/index.js";
import style from "./style.scss";

//Export switch option wrapper
export function SwitchOption (props) {
    return (
        <Option title={props.title}>
            <div className={style.root}>
                <div className={style.text}>Off</div>
                <div align="center">
                    <Renderer render={function () {
                        return React.createElement(Switch, {
                            "onChange": function (event) {
                                return props.onChange(event.target.checked);
                            },
                            "className": style.switch,
                            "defaultValue": props.value
                        });
                    }} />
                </div>
                <div className={style.text}>On</div>
            </div>
        </Option>
    );
}
