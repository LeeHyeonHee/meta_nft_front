const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://10.0.3.115:4100',
            changeOrigin: true
        })
    )

    // app.use(
    //     createProxyMiddleware('/login', {
    //         target: 'http://localhost:8000'
    //     })
    // )
}

