const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const distDir = path.resolve(__dirname, "../dist");    // 打包生成静态文件目录

module.exports = {
    mode: "production",
    entry: {
        index: path.resolve(__dirname, "../src/index.jsx"),
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
    resolve: {
        modules: [path.resolve(__dirname, "../../node_modules")],
        extensions: [".jsx", ".js", ".json"],
        alias: {
            "@": path.resolve(__dirname, "../src")
        } // 配置别名可以加快webpack查找模块的速度
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ],
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ],
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
                include: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "img/[name].[hash:6].[ext]"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "font/[name].[hash:6].[ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            "client/dist/*",
            "server/views/index.html"
        ], { root: process.cwd() }),  // option默认路径
        new HtmlWebpackPlugin({
            filename: "../../server/views/index.html",
            template: "./server/views/index.tpl.html",
            favicon: "./favicon.ico",
            chunks: ["index", "index"]
        }),
        new ProgressBarPlugin({ summary: false }), // build进度条
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:6].css",
            chunkFilename: "css/[name].[chunkhash:6].css"
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new LodashModuleReplacementPlugin()
    ],
    optimization: {
        // 将模块分离到单独的文件中
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: "common"
                }
            }
        }
    }
};
