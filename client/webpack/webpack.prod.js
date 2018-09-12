const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const distDir = path.resolve(__dirname, "../dist");    // 打包生成静态文件目录

module.exports = {
    mode: "production",
    entry: {
        bundle: "./client/src",
        vendor: [
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
            "superagent",
            "@ckeditor/ckeditor5-build-classic"
        ]
    },
    output: {
        path: distDir,
        filename: "js/[name].[chunkhash:8].js",
        chunkFilename: "js/[name].chunk.[chunkhash:8].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        }, {
                            loader: "postcss-loader"
                        },
                        "less-loader"
                    ]
                }),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ],
                include: /node_modules/
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
    resolve: {
        extensions: [".web.js", ".js", ".jsx", ".json", ".less"]
    },
    plugins: [
        new CleanWebpackPlugin([
            "client/dist/*",
            "server/views/index.html"
        ], { root: process.cwd() }),  // option默认路径
        new HtmlWebpackPlugin({
            filename: "../../server/views/index.html",
            template: "./server/views/index.tpl.html",
            favicon: "./favicon.ico"
        }),
        new ProgressBarPlugin({ summary: false }), // build进度条
        new ExtractTextPlugin({     // 提取样式代码
            filename: "css/[name].[hash:8].css",
            disable: false,
            allChunks: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new LodashModuleReplacementPlugin
    ],
    optimization: {
        // 将模块分离到单独的文件中
        splitChunks: {
            // 将第三方库缓存在客户端
            cacheGroups: {
                vendor: {
                    chunks: "initial",    // "infinity" 等价于入口数量，即所有入口都引用的模块才会提取出来
                    name: "vendor",
                    enforce: true
                },
            }
        },
        // 优化持久化缓存。将模块信息单独打包出来，使得变更某个模块时缓存不会失效
        runtimeChunk: true
    }
}
