import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layout/index";
import testImg from "../../common/img/temp1.jpg";
import "./home.less";

export default class Home extends Component {
    constructor (props) {
        super(props);

        this.article = [
            {
                id: 0,
                img: testImg,
                title: "别人生气我不气"
            },
            {
                id: 0,
                img: testImg,
                title: "别人生气我不气"
            },
            {
                id: 0,
                img: testImg,
                title: "别人生气我不气"
            }
        ];
    }

    render() {
        return (
            <MainLayout history={this.props.history}>
                <div id="ermao-home-wrap">
                    <div className="home-banner-wrap">
                        <p className="banner-main-title">
                            <span className="first-title">ER</span>
                            <span className="second-title">MAO</span>
                        </p>
                        <Link to="/detail">
                            <button className="home-btn">时刻保持冷静</button>
                        </Link>
                    </div>
                    <div className="home-content">
                        <h1 className="main-title">文章列表</h1>
                        <h2 className="sub-title">这里会是个人觉得写得还不错的文章哦</h2>
                        <ul className="content-article-list">
                            {
                                Object.keys(this.article).map(index => {
                                    const item = this.article[index];
                                    return (
                                        <Link to="/" className="content-article-item">
                                            <li key={index}>
                                                <img className="content-article-img" src={item.img} alt={item.title} />
                                                <p className="content-article-title">{item.title}</p>
                                            </li>
                                        </Link>
                                    );
                                })
                            }
                        </ul>
                        <p className="content-read-more">不喜欢吗？<span className="read-more">那就换!</span></p>
                    </div>
                </div>
            </MainLayout>
        );
    }
}