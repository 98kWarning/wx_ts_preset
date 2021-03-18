module.exports = {
    publicPath: './',
    lintOnSave:false,
    devServer: {
        overlay: {
            warnings: false, //不显示警告
            errors: false,//不显示错误
        },
        proxy: {
            '/wxapi': {
                target: 'https://web.clixgo.cn/wxapi',
                changeOrigin: true,
                pathRewrite: {
                    '^/wxapi': '' // 重写url，将url中的 '/api' 替换掉
                }
            }
        }
    },
    productionSourceMap: false
}