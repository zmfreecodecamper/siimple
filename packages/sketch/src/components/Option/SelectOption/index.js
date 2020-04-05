import React from "react";
import {Renderer, ForEach} from "@siimple/neutrine";
import {Select} from "@siimple/neutrine";
import {Option} from "../index.js";

//Export option component wrapper
export function SelectOption (props) {
    //Handle select change
    let handleChange = function (event) {
        return props.onChange(event.target.value);
    };
    //Return select option
    return (
        <Option title={props.title}>
            <Select className="siimple--bg-white" fluid defaultValue={props.value} onChange={handleChange}>
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

