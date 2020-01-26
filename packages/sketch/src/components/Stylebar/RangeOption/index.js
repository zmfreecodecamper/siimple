import React from "react";
import {Renderer} from "@siimple/neutrine";
import {Range} from "@siimple/neutrine";
import {Option} from "../Option/index.js";
import style from "./style.scss";

//Export range option wrapper
export function RangeOption (props) {
    return (
        <Option title={props.title}>
            <div className={style.root}>
                {/* Display range */}
                <div className={style.range}>
                    <Renderer render={function () {
                        return React.createElement(Range, {
                            "onChange": function (event) {
                                return props.onChange(Number(event.target.value));
                            },
                            "className": "siimple--mb-1 siimple--mt-1",
                            "fluid": true,
                            "min": props.min,
                            "max": props.max,
                            "step": props.step,
                            "defaultValue": props.value
                        });
                    }} />
                </div>
                {/* Display current value */}
                <div className={style.value}>{props.value}</div>
            </div>
        </Option>
    );
}
