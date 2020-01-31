import React from "react";
import {If, Renderer} from "@siimple/neutrine";
import {Button} from "../Button/index.js";
import {Dialog} from "../Dialog/index.js";
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
                <Renderer render={function () {
                    return React.createElement(Button, {
                        "className": style.item,
                        "icon": (self.state.active) ? "cross" : "menu",
                        "active": self.state.active,
                        "onClick": self.handleToggle
                    });
                }} />
                {/* Render menu items */}
                <If condition={this.state.active}>
                    {/* Settings button */}
                    <If condition={this.props.showSettingsBtn} render={function () {
                        return React.createElement(Button, {
                            "className": style.item,
                            "icon": "gear",
                            "onClick": self.props.onSettingsClick
                        });
                    }} />
                    {/* Save button */}
                    <If condition={this.props.showSaveBtn} render={function () {
                        return React.createElement(Button, {
                            "className": style.item,
                            "icon": "save",
                            "onClick": self.props.onSaveClick
                        });
                    }} />
                    {/* Export button */}
                    <If condition={this.props.showExportBtn} render={function () {
                        return React.createElement(Button, {
                            "className": style.item,
                            "icon": "download",
                            "onClick": self.props.onExportClick
                        });
                    }} />
                </If>
            </div>
        );
    }
}

//Default props
Menubar.defaultProps = {
    "showSettingsBtn": false,
    "showSaveBtn": false,
    "showExportBtn": false
};


