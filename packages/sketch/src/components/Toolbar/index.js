import React from "react";
import {ForEach, Renderer} from "@siimple/neutrine";
import {Button} from "../Button/index.js";
import style from "./style.scss";

//Available items
let availableItems = [
    {"name": "selection", "icon": "pointer"},
    {"name": "rectangle", "icon": "square"},
    {"name": "ellipse", "icon": "circle"},
    {"name": "line", "icon": "minus"},
    {"name": "arrow", "icon": "arrow-right"},
    {"name": "text", "icon": "text"}
];

//Export toolbar component
export function Toolbar (props) {
    return (
        <div className={style.root}>
            {/* Render elements */}
            <ForEach items={availableItems} render={function (item, index) {
                return React.createElement(Button, {
                    "className": style.item,
                    "active": props.currentElement === item.name,
                    "icon": item.icon,
                    "onClick": function () {
                        return props.onElementClick(item.name);
                    },
                    "key": index
                });
            }} />
            {/* Divider */}
            <div className={style.divider} />
            {/* Render grid option */}
            <Renderer render={function () {
                return React.createElement(Button, {
                    "className": style.item,
                    "active": props.gridActive,
                    "icon": "grid",
                    "onClick": props.onGridClick
                });
            }} />
            {/* Render screenshot option */}
            <Renderer render={function () {
                return React.createElement(Button, {
                    "className": style.item,
                    "active": props.screenshotActive,
                    "icon": "camera",
                    "onClick": props.onScreenshotClick
                });
            }} />
        </div>
    );
}

//Toolbar options
Toolbar.defaultProps = {
    "gridActive": false,
    "screenshotActive": false
};

