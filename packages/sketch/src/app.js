import React from "react";
import ReactDOM from "react-dom";
import * as Router from "rouct";
import kofi from "kofi";
import {Appbar, AppbarWrapper} from "@siimple/neutrine";
import {AppbarItem, AppbarBrand, AppbarAvatar} from "@siimple/neutrine";
import {global} from "@siimple/neutrine";
import {createToaster} from "@siimple/neutrine";

//Import global styles
//import "./style.scss";

//Import pages components
import {Editor} from "./pages/Editor/index.js";
//import {Home} from "./pages/Home/index.js";

//App component
class App extends React.Component {
    constructor(props) {
        super(props);
        //Initialize the app state
        this.state = {};
        //Bind app methods
        //TODO
    }
    //Render the app component
    render() {
        return React.createElement(Editor, {});
        //return (
        //    <Router.HashbangRouter>
        //        <AppbarWrapper>
        //            <Appbar className="siimple--bg-primary">
        //                <AppbarBrand />
        //                <AppbarItem icon="gear" />
        //                <AppbarAvatar />
        //            </Appbar>
        //            {/*
        //            <Router.Switch>
        //                <Router.Route exact path="/editor" component={Editor} />
        //            </Router.Switch>
        //            */}
        //            <Editor />
        //        </AppbarWrapper>
        //    </Router.HashbangRouter>
        //);
    }
}

//Mount the app
kofi.ready(function () {
    //Initialize global state
    Object.assign(global, {
        "toast": createToaster({
            "position": "bottom",
            "timeout": 6000
        })
    });
    //Mount root component
    ReactDOM.render(<App />, document.getElementById("root"));
});


