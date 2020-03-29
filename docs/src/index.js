import React from "react";
import ReactDOM from "react-dom";
import kofi from "kofi";
import {HashbangRouter as Router} from "rouct";
import {Switch, Route} from "rouct";
import {If} from "@siimple/neutrine";
import {Appbar, AppbarWrapper, AppbarItem} from "@siimple/neutrine";

import {Home} from "./pages/Home/index.js";
import {Page} from "./pages/Page/index.js";
import {client} from "./client.js";
import {redirect} from "./utils.js";

//Appbar items
let appbarItems = kofi.values({
    "home": {"icon": "book", "path": "/"},
    "repo": {"icon": "archive", "path": "https://github.com/siimple/siimple"}
});

//App component
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "loading": true,
            "config": null
        };
    }
    //Component did mount --> import site config
    componentDidMount() {
        let self = this;
        return client("/config.json").then(function (response) {
            //console.log(response.body);
            return self.setState({
                "loading": false,
                "config": response.body
            });
        });
    }
    //Render appbar items
    renderAppbarItems() {
        return appbarItems.map(function (item, index) {
            return React.createElement(AppbarItem, {
                "icon": item.icon,
                "onClick": function () {
                    return redirect(item.path);
                },
                "key": index
            });
        });
    }
    //Render documentation app
    render() {
        let self = this;
        return (
            <Router>
                {/* Display loading */}
                <If condition={this.state.loading === true}>
                    Loading...
                </If>
                {/* Mount app routing */}
                <If condition={this.state.loading === false} render={function () {
                    let props = {
                        "packages": self.state.config.packages
                    };
                    //Return main content
                    return (
                        <AppbarWrapper>
                            {/* Documentation appbar */}
                            <Appbar className="siimple--bg-primary">
                                {self.renderAppbarItems()}
                            </Appbar>
                            {/* Documentation routes */}
                            <Switch>
                                <Route path="/" exact component={Home} props={props} />
                                <Route path="*" component={Page} props={props} />
                            </Switch>
                        </AppbarWrapper>
                    );
                }} />
            </Router>
        );
    }
}

//Mount documentation app
kofi.ready(function () {
    ReactDOM.render(<App />, document.getElementById("root"));
});

