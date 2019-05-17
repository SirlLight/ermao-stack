import AsyncComponent from "@/common/tools/AsyncComponent";

const Home = AsyncComponent(() => import(/* webpackChunkName: "home" */"./home/home"));
const Register = AsyncComponent(() => import(/* webpackChunkName: "register" */"./register/register"));
const Login = AsyncComponent(() => import(/* webpackChunkName: "login" */"./login/login"));
const Detail = AsyncComponent(() => import(/* webpackChunkName: "detail" */"./detail/article"));

export default {
    Home,
    Register,
    Login,
    Detail
};