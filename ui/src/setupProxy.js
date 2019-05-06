const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  const { REACT_APP_API_URL } = process.env;
  const proxyPaths = ['/api', '/login', '/auth/shopify'];

  app.use(proxy(proxyPaths, { target: REACT_APP_API_URL }));
};
