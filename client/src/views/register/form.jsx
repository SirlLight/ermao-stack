import React, { Component } from "react";
import { message } from "antd";
import "./register.less";
import API from "../../api";

export default class RegisterForm extends Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            formConfig: [
                {
                    name: "username",
                    type: "text",
                    placeholder: "用户名",
                    pattern: [/\S+/, /^\S{1,15}$/],
                    tips: ["必填", "不能超过15个字符"]
                },
                {
                    name: "password",
                    type: "password",
                    placeholder: "密码",
                    pattern: [/\S+/, /\w{6,}/],
                    tips: ["必填", "密码格式不正确，请输入至少6位字母或数字或下划线"]
                },
                {
                    name: "rePwd",
                    type: "password",
                    placeholder: "重复密码",
                    pattern: [/\S+/],
                    tips: ["必填"]
                },
                {
                    name: "email",
                    type: "text",
                    placeholder: "邮箱",
                    pattern: [/\S+/, /^([A-Za-z0-9_-]\.)+@([A-Za-z0-9_-]\.)+\.([A-Za-z]{2,4})$/],
                    tips: ["必填", "邮箱格式不正确"]
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
        const _this = this;
        if (!(obj instanceof Array)) {
            if (obj.pattern) {
                obj.error = "";
                for (const i in obj.pattern) {
                    if (!obj.pattern[i].test(obj.value || "")) {
                        obj.error = obj.tips[i];
                        break;
                    }
                }

                if (obj.name === "username" && obj.value) {
                    API.validateUserName({ name: obj.value }).then(res => {
                        if (res && res.code !== 0) {
                            const temp = _this.state.formConfig[0];
                            temp.error = res.msg;
                            _this.redraw(temp, 0);
                        }
                    });
                }

                if (obj.name === "rePwd" && obj.value !== _this.state.formConfig[1].value) {
                    obj.error = "密码两次输入不一致";
                }
            }
        } else {
            obj = obj.map(item => _this.validate(item));
        }
        return obj;
    };

    redraw = (obj, key) => {
        const { formConfig } = this.state;
        let itemArr = formConfig;
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

        API.register(_this.fmtData(formData)).then(res => {
            if (res && res.code === 0) {
                _this.props.setReg(true);
            } else {
                message.error("注册失败");
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
                className="reg-form-input"
                data-key={arg.key}
                name={arg.name}
                type={arg.type}
                placeholder={arg.placeholder}
                onBlur={e => this.setItem(e, arg)} />
            {arg.error ? <span className="warn-text reg-form-error">{arg.error}</span> : null}
        </div>
    );

    render() {
        const { formConfig } = this.state;

        return (
            <form id="reg-form" onSubmit={this.handleSubmit}>
                <ul className="reg-form-list">
                    {
                        formConfig.map(item => (
                            <li key={item.name} className="reg-form-item">
                                {
                                    this.getInput({ ...item, key: item.name })
                                }
                            </li>
                        ))
                    }
                    <li className="reg-form-item form-item-top">
                        <button type="submit" className="form-btn">注册</button>
                    </li>
                    <li className="reg-bottom">
                        点击 注册 按钮表示同意
                        <a className="reg-rules" href="www.baidu.com">《用户注册规则》</a>
                    </li>
                </ul>
            </form>
        );
    }
}