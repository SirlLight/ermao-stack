import React, { Component } from "react";
import HomeHeader from "../../layout/home-nav";

export default class Detail extends Component {
    constructor (props) {
        super(props);

        this.article = {};
    }

    render() {
        return (
            <div id="ermao-detail-wrap">
                <HomeHeader history={this.props.history} />
                <p>detail</p>
                <div className="home-footer">
                    ©2018 这里是一只火辣辣的二毛
                </div>
            </div>
        );
    }
}