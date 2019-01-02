import React, { Component } from "react";
import PageLoading from "../../common/components/loading/page-loading";
import HomeHeader from "../../layout/home-nav";
import RegisterForm from "./form";
import "./register.less";

export default class Register extends Component {
    constructor (props) {
        super(props);

        this.state = {
            regSuccess: false
        };
    }

    setReg = (value) => {
        const _this = this;
        _this.setState({
            regSuccess: value
        });

        if (value) {
            setTimeout(() => {
                _this.props.history.replace("/login");
            }, 2000);
        }
    }

    render() {
        return (
            <div id="ermao-register-wrap">
                {
                    this.state.regSuccess ? <PageLoading text="注册成功，快去登录叭~" /> : null
                }
                <HomeHeader history={this.props.history} />
                <div className="register-banner-wrap">
                    <p className="banner-main-title">
                        <span className="first-title">ER</span>
                        <span className="second-title">MAO</span>
                    </p>
                    <p className="banner-sub-title">快来玩呀</p>
                </div>
                <RegisterForm setReg={this.setReg} />
                <div className="reg-bottom">
                    点击 注册 按钮表示同意
                    <a className="reg-rules" href="www.baidu.com">《用户注册规则》</a>
                </div>
            </div>
        );
    }
}