import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeHeader from "../../layout/home-nav";
import testImg from "../../common/img/temp1.jpg";
import "./home.less";

export default class Home extends Component {
    constructor (props) {
        super(props);

        this.article = [
            {
                id: 0,
                img: testImg,
                title: "woshibiaoti"
            },
            {
                id: 0,
                img: testImg,
                title: "woshibiaoti"
            },
            {
                id: 0,
                img: testImg,
                title: "woshibiaoti"
            }
        ];
    }

    render() {
        return (
            <div id="ermao-home-wrap">
                <HomeHeader history={this.props.history} />
                <div className="home-banner-wrap">
                    <p className="banner-main-title">
                        <span className="first-title">ER</span>
                        <span className="second-title">MAO</span>
                    </p>
                    <Link to="/">
                        <button className="home-btn">时刻保持冷静</button>
                    </Link>
                </div>
                <div className="home-content">
                    <h1 className="main-title">文章列表</h1>
                    <h2 className="sub-title">这里会是个人觉得写得还不错的文章哦</h2>
                    <ul className="content-article-list">
                        {
                            Object.keys(this.article).map(index => {
                                let item = this.article[index];
                                return (
                                    <li key={index} className="content-article-item">
                                        <img className="content-article-img" src={item.img} />
                                        <Link to="/" className="content-article-title">{item.title}</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <p className="content-read-more">不喜欢吗？<a className="read-more">那就换!</a></p>
                </div>
                <div className="home-footer">
                    ©2018 这里是一只火辣辣的二毛
                </div>
            </div>
        );
    }
};