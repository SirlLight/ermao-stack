import React, { Component } from "react";
import MainLayout from "../../layout/index";
import PageLoading from "../../common/components/loading/page-loading";
import LoginForm from "./form";
import "./login.less";

export default class Login extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isLogin: false
        };
    }

    setLogin = (value) => {
        const _this = this;
        _this.setState({
            isLogin: value
        });

        if (value) {
            setTimeout(() => {
                _this.props.history.replace("/");
            }, 2000);
        }
    }

    render() {
        return (
            <MainLayout history={this.props.history}>
                <div id="ermao-login-wrap">
                    {
                        this.state.isLogin ? <PageLoading text="成功登录了哟，enjoy yourself~" /> : null
                    }
                    <div className="login-banner-wrap">
                        <p className="banner-main-title">
                            <span className="first-title">ER</span>
                            <span className="second-title">MAO</span>
                        </p>
                        <p className="banner-sub-title">快来玩呀</p>
                    </div>
                    <LoginForm setLogin={this.setLogin} />
                </div>
            </MainLayout>
        );
    }
}