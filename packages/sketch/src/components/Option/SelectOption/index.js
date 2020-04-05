import React from "react";
import {classNames} from "@siimple/neutrine";
import {Renderer, ForEach} from "@siimple/neutrine";
import {Select} from "@siimple/neutrine";
import {Option} from "../index.js";

//Export option component wrapper
export function SelectOption (props) {
    let handleChange = function (event) {
        return props.onChange(event.target.value);
    };
    let classList = classNames({
        "siimple--bg-white": true,
        "siimple--px-1": true,
        "siimple--py-1": true
    });
    //Return select option
    return (
        <Option title={props.title}>
            <Select className={classList} fluid defaultValue={props.value} onChange={handleChange}>
                <ForEach items={Object.keys(props.values)} render={function (key, index) {
                    return React.createElement("option", {
                        "value": key,
                        "key": index
                    }, props.values[key]);
                }} />
            </Select>
        </Option>
    );
}

