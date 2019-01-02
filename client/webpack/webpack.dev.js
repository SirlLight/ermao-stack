const path = require("path"),   // node的path  
    HtmlWebpackPlugin = require("html-webpack-plugin"),    // html自动化编译
    LodashModuleReplacementPlugin = require("lodash-webpack-plugin"),   // 按需打包lodash
    history = require("connect-history-api-fallback"), // h5路由适配
    proxy = require("http-proxy-middleware"),   // 请求转发
    convert = require("koa-connect");

const distDir = path.resolve(__dirname, "../dist");    // 打包生成静态文件目录

const config = {
    mode: "development",
    // 开发工具, 通过使用该工具,可以自动加载source-map,方便我们的调试开发, 毕竟压缩过的代码是无法进行调试的, 而source-map可以还原之前代码并指向位置, 这样方便我们操作
    devtool: "cheap-module-eval-source-map",
    context: path.resolve(__dirname, ".."),
    // 入口文件
    entry: {
        bundle: "./src",
        vendor: [
            "react",
            "react-dom"
        ]
    },
    // 出口文件
    output: {
        path: distDir,
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        publicPath: "/"
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    "postcss-loader",
                    {
                        loader: "less-loader",
                        options: { javascriptEnabled: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "postcss-loader"
                ],
            },
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "img/[name].[hash:6].[ext]"
                }
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "font/[name].[hash:6].[ext]"
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    minimize: false
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "../server/views/index.tpl.html",
            favicon: "../favicon.ico"
        }),
        new LodashModuleReplacementPlugin()
    ],
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    serve: {
        content: [distDir],
        hot: true,
        port: "3030",
        add: (app) => {
            app.use(convert(proxy("/api", { target: "http://localhost:2333" })));
            app.use(convert(history({
                disableDotRule: true,
                verbose: true,
                htmlAcceptHeaders: ["text/html", "application/xhtml+xml"]
            })));
        },
    }
};

module.exports = config;
