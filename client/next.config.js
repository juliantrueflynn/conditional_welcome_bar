const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

module.exports = withCSS({
  webpack: (config) => {
    const env = {
      SHOPIFY_API_CLIENT_KEY: JSON.stringify(process.env.SHOPIFY_API_CLIENT_KEY),
      API_URL: JSON.stringify(process.env.API_URL),
      TUNNEL_URL: JSON.stringify(process.env.TUNNEL_URL),
    };

    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  },
});
