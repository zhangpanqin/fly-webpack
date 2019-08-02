/**
 * @author: 张攀钦
 * @date: 2019-08-01 17:51:57 星期四
 * @description: babel 全局配置
 * 1、plugins优先于presets进行编译；
 * 2、plugins按照数组的index增序(从数组第一个到最后一个)进行编译；
 * 3、presets按照数组的index倒序(从数组最后一个到第一个)进行编译，
 */
module.exports = function (api) {
    api.cache(true);
    const babelrcRoots = [
        // Keep the root as a root
        ".",

        // Also consider monorepo packages "root" and load their .babelrc files.
        "./packages/*"
    ]
    const presets = [
        [
            "@babel/preset-env",
            {
                // chrome, edge, firefox, safari, ie, ios, node,Android
                targets: {
                    // ie: "9",
                    // chrome: "67",
                    "browsers": ["> 1%", "last 2 versions", " ie>8"]
                },
                // 是否输出启用的plugins列表
                debug: true,
                loose: true,
                // 模块使用 es modules ，不使用 commonJS 规范
                modules: "auto",
                corejs: 3,
                // 怎么运用 polyfill
                useBuiltIns: "usage",
            },
        ],
    ];
    const plugins = [["@babel/plugin-transform-runtime", {
        corejs: 3,
        absoluteRuntime: false,
        helpers: true,
        regenerator: true,
        // 使用 es modules helpers, 减少 commonJS 语法代码
        useESModules: true
    }]];
    // 测试取 Node 相关变量
    if (process.env.NODE_ENV === "development") {
        console.log('开发环境', process.env);
    }
    return {
        presets,
        plugins, babelrcRoots
    };
}