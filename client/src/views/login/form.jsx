import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookie";
import { message } from "antd";
import "./login.less";
import API from "../../api";

export default class LoginForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            formConfig: [
                {
                    name: "account",
                    type: "text",
                    placeholder: "用户名/邮箱",
                    pattern: [/\S+/],
                    tips: ["必填"]
                },
                {
                    name: "password",
                    type: "password",
                    placeholder: "密码",
                    pattern: [/\S+/, /\w{6,}/],
                    tips: ["必填", "密码格式至少6位的字母或数字或下划线"]
                }
            ]
        };
    }

    setItem = (e, item) => {
        const val = e.target.value.trim(),
            key = e.target.getAttribute("data-key");
        item.value = val;
        item = this.validate(item);
        this.redraw(item, key);
    };

    validate = (obj) => {
        if (obj instanceof Array) {
            obj = obj.map(item => this.validate(item));
        } else {
            obj.error = "";
            obj.pattern.map((reg, index) => {
                if (!reg.test(obj.value || "")) {
                    obj.error = obj.tips[index];
                    return false;
                }
            });
        }
        return obj;
    };

    redraw = (obj, key) => {
        const { formConfig } = this.state;
        let itemArr = [...formConfig];
        if (obj instanceof Array) {
            itemArr = obj;
        } else {
            itemArr[key] = obj;
        }
        this.setState({
            formConfig: itemArr
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const _this = this,
            formData = _this.validate(_this.state.formConfig),
            errorArr = [];
        formData.map(item => {
            item.error && errorArr.push(item.placeholder);
        });
        if (errorArr.length) {
            message.error(`${errorArr.join("、")}格式校验出错，请检查`);
            return false;
        }
        API.login(_this.fmtData(formData)).then(res => {
            if (res && res.code === 0) {
                cookie.save("username", res.data, { path: "/" });
                _this.props.setLogin(true);
            } else {
                message.error(res.msg);
            }
        });
    };

    fmtData = (data) => {
        const result = {};
        data.map(item => {
            result[item.name] = item.value;
        });
        return result;
    };

    getInput = ({ ...arg }) => (
        <div>
            <input
                className="login-form-input"
                data-key={arg.key}
                name={arg.name}
                type={arg.type}
                placeholder={arg.placeholder}
                onBlur={e => this.setItem(e, arg)} />
            {arg.error ? <span className="warn-text login-form-error">{arg.error}</span> : null}
        </div>
    );

    render() {
        const { formConfig } = this.state;

        return (
            <form id="login-form" onSubmit={this.handleSubmit}>
                <ul className="login-form-list">
                    {
                        formConfig.map(item => (
                            <li key={item.name} className={`login-form-item ${item.name === "password" && "login-pwd-wrap"}`}>
                                {
                                    this.getInput({ ...item, key: item.name })
                                }
                            </li>
                        ))
                    }
                    <li className="login-form-item form-border-none">
                        <input type="checkbox" />
                        <span className="remenber-pwd">记住密码</span>
                    </li>
                    <li className="login-form-item login-btn-wrap">
                        <button type="submit" className="form-btn">登录</button>
                    </li>
                    <li className="login-form-bottom">
                        还没有账号？
                        <Link className="login-rules" to="/reg">立即注册</Link>
                    </li>
                </ul>
            </form>
        );
    }
}