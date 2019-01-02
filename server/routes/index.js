import path from "path";
import Router from "koa-router";
import api from "./api";
import mimes from "../util/mimes";

const router = new Router();

router.use("/api", api.routes(), api.allowedMethods());
router.use("/", async (ctx) => {
    let extname = path.extname(ctx.path);
    extname = extname ? mimes[extname.slice(1)] : "";

    if (!extname) {
        await ctx.render("index");
    }
});

router.get("*", async (ctx) => {
    if (ctx.status === 404) {
        await ctx.render("index");
    }
});

export default router.routes();