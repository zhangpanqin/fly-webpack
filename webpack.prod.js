'use strict';

const path = require('path');
const webpack = require('webpack');
// 将 css 导出样式
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 对 css 进行压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 对 html 处理
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 自动清理构建
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'development',
    module: {
        rules: [{
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 11050,
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            }, {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        // 导出 css 文件
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        // 对 css 文件进行压缩
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            filename: 'index.html',
            chunks: ['main'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new CleanWebpackPlugin(),
    ]
};