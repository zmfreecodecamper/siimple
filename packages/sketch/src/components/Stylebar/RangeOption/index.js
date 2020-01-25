import React from "react";
import {Renderer} from "@siimple/neutrine";
import {Range} from "@siimple/neutrine";
import {Option} from "../Option/index.js";

//Export range option wrapper
export function RangeOption (props) {
    return (
        <Option title={props.title}>
            <Renderer render={function () {
                return React.createElement(Range, {
                    "onChange": function (event) {
                        return props.onChange(event.target.value);
                    },
                    "className": "siimple--mb-1 siimple--mt-1",
                    "fluid": true,
                    "min": props.min,
                    "max": props.max,
                    "step": props.step,
                    "defaultValue": props.value
                });
            }} />
        </Option>
    );
}
