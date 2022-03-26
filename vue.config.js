module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 8080,
        proxy: {
            '/': {
                target: 'http://localhost:8000', // 请求本地 需要spring-boot后台项目
                ws: false,
                changeOrigin: true
            }
        }
    },
    lintOnSave: undefined
};