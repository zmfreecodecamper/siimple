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
    }
    //Handle menubar toggle
    handleToggle() {
        return this.setState({
            "active": !this.state.active
        });
    }
    //Render the menubar component
    render() {
        let self = this;
        return (
            <div className={style.root}>
                <div className={style.item}>
                    <Renderer render={function () {
                        return React.createElement(Button, {
                            "className": style.item,
                            "icon": "menu", //(self.state.active) ? "cross" : "menu",
                            "active": self.state.active,
                            "onClick": self.handleToggle
                        });
                    }} />
                </div>
                {/* Render menu items */}
                <If condition={this.state.active}>
                    {/* Save item */}
                    <If condition={this.props.showSaveBtn === true} render={function () {
                        return React.createElement(Button, {
                            "className": style.item,
                            "onClick": self.props.onSave,
                            "icon": "save"
                        });
                    }} />
                    {/* Export item */}
                    <If condition={this.props.showExportBtn === true} render={function () {
                        return React.createElement(Button, {
                            "className": style.item,
                            "onClick": self.props.onExport,
                            "icon": "download"
                        });
                    }} />
                </If>
            </div>
        );
    }
}

