module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: `${process.env.host}:${process.env.port}`,
                ws: true,
                changeOrigin: true,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                onProxyRes: function(proxyRes, req, res) {
                    proxyRes.headers['Access-Control-Allow-Origin'] = '*' // add new header to response
                  }
            }
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        allowedHosts: [
            'http://192.168.0.104:8080'
          ]
    }
}