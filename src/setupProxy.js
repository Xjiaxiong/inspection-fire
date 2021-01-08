const proxy = require('http-proxy-middleware');
const locService = 'http://192.168.0.106:9010'
const testService = 'http://111.0.89.21:9010/'
const proService = 'https://czw.menhey.cn'
module.exports = function(app) {
  app.use(proxy.createProxyMiddleware('/api', { 
      target: locService,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/" 
      } 
  }));
};