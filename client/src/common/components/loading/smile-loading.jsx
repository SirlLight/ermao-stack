import React, { Component } from "react";
import { Icon } from "antd";
import loadingImg from "../../img/loading-pikaqiu.gif";

export default class SmileLoading extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const text = this.props.text || "正在快速处理，不要着急哦~";
        const className = this.props.className || {};
        const wrapStyle = {
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            fontSize: "20px", 
            textAlign: "center", 
            background: "rgba(255, 255, 255, 0.8)",
            zIndex: 100,
            fontWeight: 100
        };

        return (
            <div id="smile-loading-wrap" style={wrapStyle} className={className}>
                <img src={loadingImg} style={{width: 190}}/>
                <p style={{color: "#f554bf"}}><Icon type="smile-o" className="margin-r-5"/>{text}</p> 
            </div>
        );
    }
};