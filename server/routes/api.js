import Router from "koa-router";
import baseCtrl from "../controller/baseCtrl";

const router = new Router();

router.post("/validateUserName", baseCtrl.validateUserName);
router.post("/register", baseCtrl.register);
router.post("/login", baseCtrl.login);

export default router;