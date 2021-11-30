const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {

    
    app.use(
        createProxyMiddleware('/api/nft-agent', {
            target: 'http://52.78.106.252:4100',
            changeOrigin: true
        })
    )

    app.use(
        createProxyMiddleware('/api/nft-agent/getAllTokensInfo', {
            target: 'http://52.78.106.252:4100',
            changeOrigin: true
        })
    )

    app.use(
        createProxyMiddleware('/api/erc20', {
            target: 'http://52.78.106.252:4200',
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/api/erc20/balanceOf', {
            target: 'http://52.78.106.252:4200',
            changeOrigin: true
        })
    )
    // app.use(
    //     createProxyMiddleware('/login', {
    //         target: 'http://localhost:8000'
    //     })
    // )
}

