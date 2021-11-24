const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {

    
    app.use(
        createProxyMiddleware('/api/nft-agent', {
            target: 'http://10.0.3.192:4100',
            changeOrigin: true
        })
    )

    app.use(
        createProxyMiddleware('/api/nft-agent/getAllTokensInfo', {
            target: 'http://10.0.4.192:4100',
            changeOrigin: true
        })
    )

    app.use(
        createProxyMiddleware('/api/erc20', {
            target: 'http://10.0.3.192:4200',
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/api/erc20/balanceOf', {
            target: 'http://10.0.3.192:4200',
            changeOrigin: true
        })
    )
    // app.use(
    //     createProxyMiddleware('/login', {
    //         target: 'http://localhost:8000'
    //     })
    // )
}

