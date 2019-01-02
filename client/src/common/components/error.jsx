import React from "react";
import { Icon } from "antd";
import errorImg from "../img/error.jpg";
import "../style/error.less";

const Error = (props) => {

    const { text, className } = props,
        displayText = text || "出错啦";

    return (
        <div id="page-error-wrap" className={className}>
            <div className="error-content-wrap">
                <img src={errorImg} className="error-img" alt="error" />
                <div className="text-wrap">
                    <p>
                        <Icon type="meh-o" className="margin-r-5" />{displayText}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Error;