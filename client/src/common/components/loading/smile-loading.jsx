import React from "react";
import { Icon } from "antd";
import loadingImg from "../../img/loading-pikaqiu.gif";
import "./index.less";

const SmileLoading = (props) => {

    const { text, className, wrapStyle, loading } = props,
        displayText = text || "正在快速处理，不要着急哦~";
    
    return loading ? (
        <div id="smile-loading-wrap" style={wrapStyle} className={className}>
            <img src={loadingImg} style={{ width: 190 }} alt="loading..." />
            <p style={{ color: "#f554bf" }}>
                <Icon type="smile-o" className="margin-r-5" />{displayText}
            </p>
        </div>
    ) : null;
};
export default SmileLoading;