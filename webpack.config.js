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
    },
    resolve: {
        // 自动解析扩展类型
        extensions: ['.wasm', '.mjs', '.js', '.json'],
        // 解析的模块路径
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        // 配置路径别名，绝对路径
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "#": path.resolve(__dirname, 'public'),
        }
    },
    module: {
        /**
    * test: 匹配特定条件。一般是提供一个正则表达式或正则表达式的数组
    * include: 匹配特定条件。一般是提供一个字符串或者字符串数组
    * exclude: 排除特定条件
    * and: 必须匹配数组中的所有条件
    * or: 匹配数组中任何一个条件,
    * nor: 必须排除这个条件
    */
        rules: [
            // 处理 js
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            // 处理 css
            {
                test: /\.css$/,
                use: [
                    //将 JS 字符串生成为 style 节点
                    'style-loader',
                    //将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 处理 scss
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpeg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].png',  //[path] 上下文环境路径
                            publicPath: './assets/images/',    //公共路径
                            outputPath: 'assets/images/',  //输出路径							
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            arrts: ['img:src', 'img:data-src'],
                            minimize: false  //是否压缩html
                        }
                    }
                ]
            },
            {
                test: /(iconfont.svg)|\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',  //[path] 上下文环境路径
                            publicPath: './assets/iconfont/mobirise/',    //公共路径
                            outputPath: 'assets/iconfont/mobirise/',  //输出路径							
                        }
                    }
                ]
            }
        ]
    },
    // 查看配置信息 https://webpack.docschina.org/plugins/split-chunks-plugin/
    optimization: {
        // 只打包导出 js 用的方法
        usedExports: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'chunks',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial',
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "测试页面的 title",
            // 配置输出文件名和路径
            filename: "index.html",
            // 配置要被编译的html文件
            template: './public/index.html',
            minify: {
                // 删除双引号
                removeAttributeQuotes: true,
                // 折叠 html 为一行
                collapseWhitespace: true
            },
            hash: true,
            chunks: ["runtime", "vendors", "index", "login", "login2"]
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // chunks hash
        new webpack.HashedModuleIdsPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 8081,
        // 自动打开浏览器
        open: true,
        // 服务器压缩
        compress: true,
        // 热加载，配合 new webpack.HotModuleReplacementPlugin(),
        hot: true,
        hotOnly: true,
        inline: true
    },
};
module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        // 配置开发模式，可以容易定位错误
        // config.devtool = 'source-map';
        config.devtool = 'cheap-eval-source-map';
        config.plugins.push(new webpack.ProgressPlugin());
    }

    if (argv.mode === 'production') {
        config.devtool = 'none';
    }
    console.log(argv.mode);

    return config;
}