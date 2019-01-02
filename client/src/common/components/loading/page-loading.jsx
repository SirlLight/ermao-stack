import React from "react";
import { Icon } from "antd";
import loadingImg from "../../img/loading-cat.gif";

const PageLoading = (props) => {

    const { text, className } = props,
        displayText = text || "即将抵达目的页面，请稍后~",
        wrapStyle = {
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
        <div id="page-loading-wrap" style={wrapStyle} className={className}>
            <img src={loadingImg} style={{ width: 190 }} alt="loading..." />
            <p style={{ color: "#f554bf" }}>
                <Icon type="smile-o" className="margin-r-5" />{displayText}
            </p>
        </div>
    );
};

export default PageLoading;