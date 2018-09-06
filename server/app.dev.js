"use strict";

import path from "path";
import Koa from "koa";
import body from "koa-body";
import serverStatic from "koa-static";
import views from "koa-views";
import session from "koa-session";

import routes from "./routes";
import webpackServe from "webpack-serve";
import webpackConfig from "../client/webpack/webpack.dev";

const app = new Koa();

app.keys = ["some secret hurr"];

const CONFIG = {
  key: "koa:sess", /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

app.use(body({
    multipart: true
}));

app.use(async (ctx, next) => {
    ctx.path = ctx.path.replace(/\/+/, "/");
    await next();
});

// 静态资源文件夹
app.use(serverStatic(
    path.resolve(__dirname, "../client/dist")
));

// 模板引擎
app.use(views(
    path.resolve(__dirname, "./views"), 
    {
        map: {html: "ejs"}
    }
));

webpackServe({}, {config: webpackConfig});

app.use(routes);

app.listen(2333, () => {
    console.log(`listening in 2333`);
});