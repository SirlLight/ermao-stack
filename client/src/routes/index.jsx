import React, { Component } from "react";
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

import routes from "./routes";

export default class RoutesComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {
                        routes.map((route, k) => {
                            return (<Route exact={route.exact} path={route.path} key={k} component={route.component}/>)
                        })
                    }
                    <Redirect from="*" to="/" />
                </Switch>
            </BrowserRouter>
        )
    }
}