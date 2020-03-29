import React from "react";
import {Content} from "@siimple/neutrine";
import {Heading, Paragraph} from "@siimple/neutrine";
import {Card, CardContent, CardLink} from "@siimple/neutrine";
import {Row, Column} from "@siimple/neutrine";
import {ForEach} from "@siimple/neutrine";

import {redirect} from "../../utils.js";
import style from "./style.scss";

//Export home page
export function Home (props) {
    let packages = Object.keys(props.packages);
    return (
        <div className={style.root}>
            <Content size="medium">
                {/* Heading */}
                <div className="siimple--color-white siimple--mb-5">
                    <div className={style.heading2}>Welcome to</div>
                    <div className={style.heading1}>
                        <strong>siimple</strong>
                        <span style={{"opacity":"0.8"}}>docs</span>
                    </div>
                </div>
                {/* Site content */}
                <Paragraph className="siimple--color-white" lead style={{"opacity":"0.8"}}>
                    Check out the installation and usage guides of all toolkits and applications of the <strong>siimple</strong> ecosystem!
                </Paragraph>
                {/* Packages */}
                <Row className="siimple--pt-4">
                    <ForEach items={packages} render={function (key, index) {
                        let pkg = props.packages[key]; //Get package data
                        let handleClick = function () {
                            return redirect(`/${key}/index.html`);
                        };
                        return (
                            <Column size="6" extraSmall="12" key={index}>
                                <Card theme="dark" className={style.card} onClick={handleClick}>
                                    <CardContent>
                                        <Heading type="h4" className="siimple--mb-0">
                                            <strong>{pkg.name}</strong>
                                        </Heading>
                                    </CardContent>
                                    <CardContent>
                                        <div>{pkg.description}</div>
                                        <div className="siimple-small siimple--color-white" style={{"opacity":"0.5"}}>
                                            Current version: <strong>v{pkg.version}</strong>
                                        </div>
                                    </CardContent>
                                    <CardLink className="siimple--text-bold">
                                        <span>Get started</span>
                                    </CardLink>
                                </Card>
                            </Column>
                        );
                    }} />
                </Row>
            </Content>
        </div>
    );
}

