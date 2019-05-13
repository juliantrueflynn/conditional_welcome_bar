const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  const { REACT_APP_API_HOST_URL } = process.env;
  const proxyPaths = [
    '/api',
    '/graphql',
    '/login',
    '/logout',
    '/auth/shopify',
    '/assets/shopify_app',
    '/enable_cookies',
    '/top_level_interaction',
    '/granted_storage_access',
  ];

  app.use(proxy(proxyPaths, { target: REACT_APP_API_HOST_URL }));
};
