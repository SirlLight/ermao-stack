import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookie";

export default class HomeHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: false
        };
    }

    componentWillMount () {
        if (cookie.load("username")) {
            this.setState({
                isLogin: true,
                username: cookie.load("username")
            });
        }
    }

    logout = () => {
        cookie.remove("username", {path: "/"});
        this.setState({
            isLogin: false
        });
    };

    render() {
        return (
            <ul className="home-header-wrap">
                <li className="header-item header-item-left pull-left">
                    <Link to="/">首页</Link>
                </li>
                <li className="header-item header-logo-wrap">
                    <Link to="/">
                        <i className="home-header-logo" />
                    </Link>
                </li>
                {
                    this.state.isLogin ? (
                        <li className="header-item header-item-right pull-right header-account">
                            <Link to="/"><dt>{this.state.username}</dt></Link>
                            <dl className="account-list-wrap">
                                <Link to="/"><dt className="account-list-item">我的主页</dt></Link>
                                <dt className="account-list-item" onClick={this.logout}>退出</dt>
                            </dl>
                        </li>
                    ) : null
                }
                {
                    this.state.isLogin ? null : (
                        <li className="header-item header-item-right pull-right">
                            <Link to="/reg">注册</Link>
                        </li>
                    )
                }
                {
                    this.state.isLogin ? null : (
                        <li className="header-item header-item-right pull-right">
                            <Link to="/login">登录</Link>
                        </li>
                    )
                }
            </ul>
        );
    }
}