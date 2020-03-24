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
            "active": false,
            "current": ""
        };
        //Bind methods
        this.handleToggle = this.handleToggle.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }
    //Handle menubar toggle
    handleToggle() {
        return this.setState({
            "active": !this.state.active,
            "current": "" //Clear current option
        });
    }
    //Handle option change
    handleOptionChange(name) {
        let self = this;
        return function () {
            let current = self.state.current; //Get current value
            return self.setState({
                "current": (current === name) ? "" : name
            });
        };
    }
    //Render the menubar component
    render() {
        let self = this;
        let current = this.state.current; //Current option
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
                <If condition={this.state.active}>
                    {/* Settings button */}
                    <If condition={this.props.showSettingsBtn}>
                        <div className={style.item}>
                            <Renderer render={function () {
                                return React.createElement(Button, {
                                    "active": current === "settings",
                                    "className": style.item,
                                    "onClick": self.handleOptionChange("settings"),
                                    "icon": "gear"
                                });
                            }} />
                            <Dialog active={current === "settings"} orientation="right">
                                Options
                            </Dialog>
                        </div>
                    </If>
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


