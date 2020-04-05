import React from "react";
import {If, Renderer} from "@siimple/neutrine";
import {Button} from "../Button/index.js";
import style from "./style.scss";

//Export menubar component
export class Menubar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "active": false
        };
        //Bind methods
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    //Handle menubar toggle
    handleToggle() {
        return this.setState({
            "active": !this.state.active
        });
    }
    //Handle menu item click
    handleClick(name) {
        if (typeof this.props.onClick !== "function") {
            return null; //Nothing to do
        }
        let self = this;
        //Return a method that calls the onClick method with the item name
        return function () {
            return self.props.onClick(name);
        };
    }
    //Render the menubar component
    render() {
        let self = this;
        let current = this.state.current; //Current option
        let items = Object.keys(this.props.items); //Get menu items keys
        return (
            <div className={style.root}>
                <div className={style.item}>
                    <Renderer render={function () {
                        return React.createElement(Button, {
                            "className": style.item,
                            "icon": (self.state.active) ? "cross" : "menu",
                            "active": self.state.active,
                            "onClick": self.handleToggle
                        });
                    }} />
                </div>
                {/* Render menu items */}
                <If condition={this.state.active} render={function () {
                    return items.map(function (name, index) {
                        return React.createElement(Button, {
                            //"active": current === "settings",
                            "active": false,
                            "key": index,
                            "className": style.item,
                            "onClick": self.handleClick(name),
                            "icon": self.props.items[name]
                        });
                    });
                }} />
            </div>
        );
    }
}

//Default props
Menubar.defaultProps = {
    "items": {},
    "onClick": null
};


