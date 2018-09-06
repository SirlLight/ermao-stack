import database from "../config/db";
import bcrypt from "bcrypt";
const User = database.User

// 通过ctx.request.body这种方式获取请求body中的参数
// 通过ctx.query获取url上的参数

class baseCtrl {

    static async register(ctx, next) {
        let data = ctx.request.body,
            insertData = {
                username: data.username,
                password: data.password,
                email: data.email
            };
            // ctx.body = {
            //     code: 0,
            //     data: [],
            //     msg: "注册成功"
            // };

            if (!insertData.username || !insertData.password || !insertData.email) {
                ctx.body = {
                    code: -1,
                    data: [],
                    msg: "请输入用户名、密码以及邮箱"
                };
            } else {
                let salt = bcrypt.genSaltSync(10),
                    pwdHash = bcrypt.hashSync(insertData.password, salt);

                insertData.password = pwdHash;
                
                try {
                    // 这个地方执行的数据库操作：
                    // INSERT INTO `User` (`username`, `password`, `email`) VALUES (data.username, data.password, data.email)
                    await User.create(insertData).then(res => {
                        res = res.toJSON();
                        if (res.id) {
                            ctx.body = {
                                code: 0,
                                data: [],
                                msg: "注册成功"
                            };
                        } else {
                            ctx.body = {
                                code: -1,
                                data: [],
                                msg: "注册失败"
                            };
                        }
                    });
                } catch (error) {
                    console.log(error);
                    return ctx.body = error.response.text;
                }
            }
    }

    static async login(ctx, next) {
        let data = ctx.request.body,
            params = {
                account: data.account,
                password: data.password
            };

            ctx.session.user = params;
            // ctx.body = {
            //     code: 0,
            //     data: params.account,
            //     msg: "success"
            // };
        
        try {
            // 这个地方执行的数据库操作是：
            // SELECT `id`, `username`, `password` FROM `User` WHERE ( `username` = params.account OR `email` = params.account ) LIMIT 1;
            await User.findOne({
                attributes: ["id", "username", "password"],
                where: {
                    $or: [
                        {username: params.account},
                        {email: params.account}
                    ]
                }
            }).then(async(user) => {
                if (user) {
                    let isMatch = bcrypt.compareSync(params.password, user.password);
                    if (isMatch) {
                        ctx.body = {
                            code: 0,
                            data: user.username,
                            msg: "登录成功"
                        };
                    } else {
                        ctx.body = {
                            code: 1,
                            data: [],
                            msg: "密码错误"
                        };
                    }
                } else {
                    ctx.body = {
                        code: -1,
                        data: [],
                        msg: "用户名或邮箱不存在"
                    };
                }
            }); 
        } catch (error) {
            return ctx.body = error.response.text;
        }
    }

    static async validateUserName (ctx, next) {
        let name = ctx.request.body.name;
        // ctx.body = {
        //     code: 0,
        //     data: [],
        //     msg: "注册成功"
        // };
        if (name) {
            try {
                let userCount = await User.count({
                    where: {
                        username: name
                    }
                });

                if (userCount) {
                    ctx.body = {
                        code: -1, 
                        data: [],
                        msg: "用户名已被占用"
                    };
                } else {
                    ctx.body = {
                        code: 0, 
                        data: [],
                        msg: "用户名可用"
                    };
                }
            } catch (error) {
                return ctx.body = error.response.text;
            }
        } else {
            ctx.body = {
                code: -1, 
                data: [],
                msg: "用户名不能为空"
            };
        }
    }
}

export default baseCtrl;
