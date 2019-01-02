import React from "react";
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

import routes from "./routes";

const RoutesComponent = () => (
    <BrowserRouter>
        <Switch>
            {
                routes.map(route => (
                    <Route exact={route.exact} path={route.path} key={route.path} component={route.component} />
                ))
            }
            <Redirect from="*" to="/" />
        </Switch>
    </BrowserRouter>
);

export default RoutesComponent;