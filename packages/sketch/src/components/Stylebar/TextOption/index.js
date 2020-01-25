import React from "react";
import {classNames} from "@siimple/neutrine";
import {Renderer} from "@siimple/neutrine";
import {Textarea} from "@siimple/neutrine";
import {Option} from "../Option/index.js";

//Export option component wrapper
export function TextOption (props) {
    return (
        <Option title={props.title}>
            <Renderer render={function () {
                return React.createElement(Textarea, {
                    "className": classNames({
                        "siimple--bg-white": true,
                        "siimple--px-1": true,
                        "siimple--py-1": true
                    }),
                    "onChange": function (event) {
                        return props.onChange(event.target.value);
                    },
                    "rows": 3,
                    "fluid": true,
                    "defaultValue": props.value
                });
            }} />
        </Option>
    );
}

