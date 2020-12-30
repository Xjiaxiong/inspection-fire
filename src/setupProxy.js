const proxy = require('http-proxy-middleware');
const testTarget = 'http://192.168.0.104:9010'
const target = 'https://czw.menhey.cn'
const service = 'http://111.3.65.82:9011'
const testService = 'http://111.0.89.21:9010/'
module.exports = function(app) {
  app.use(proxy.createProxyMiddleware('/api', { 
      target: testTarget,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/" 
      } 
  }));
};