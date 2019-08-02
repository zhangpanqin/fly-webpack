const path = require('path');
// 清理 dist 目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 处理页面
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于访问 webpack 内置插件
const webpack = require('webpack');
const config = {
    entry: {
        index: ['./src/index.js', './src/index-2.js'],
        // index2: './src/index-2.js',
        login: './src/login.js',
        login2: './src/login-2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    }, plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html', chunks: ["runtime", "vendors", "index", "login", "login2"] }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // chunks hash
        new webpack.HashedModuleIdsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                // use: {
                //     loader: 'babel-loader',
                // }
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json'],
        modules: ["src", "public", 'node_modules'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "#": path.resolve(__dirname, 'public'),
        }
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
};
module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        // 配置开发模式，可以容易定位错误
        config.devtool = 'source-map';
        config.plugins.push(new webpack.ProgressPlugin());
    }

    if (argv.mode === 'production') {

    }
    console.log(argv.mode);

    return config;
}