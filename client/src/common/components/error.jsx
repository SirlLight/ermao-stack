import React, { Component } from "react";
import { Icon } from "antd";
import errorImg from "../img/error.jpg";
import "../style/error.less";

export default class Error extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const text = this.props.text || "出错啦";
        const className = this.props.className || {};

        return (
            <div id="page-error-wrap" className={className}>
                <img src={errorImg} className="error-img" />
                <div className="text-wrap">
                    <p><Icon type="meh-o" className="margin-r-5"/>{text}</p>
                </div> 
            </div>
        );
    }
};