import * as View from "../views";

export default [
    {
        path: "/",
        exact: true,
        component: View.Home
    },
    {
        path: "/reg",
        exact: true,
        component: View.Register
    },
    {
        path: "/login",
        exact: true,
        component: View.Login
    },
    {
        path: "/detail",
        exact: true,
        component: View.Detail
    }
]