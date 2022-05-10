const proxy = require('http-proxy-middleware');
const locService = 'http://192.168.0.104:9011'
const testService = 'http://111.0.89.21:9010/'
const proService = 'https://czw.menhey.cn'
const mockService = 'http://localhost:3001'
module.exports = function(app) {
  app.use(proxy.createProxyMiddleware('/api', { 
      target: locService,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/" 
      } 
  }));
};