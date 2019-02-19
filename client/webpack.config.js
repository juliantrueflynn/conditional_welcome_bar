const webpack = require('webpack');

const { NODE_ENV, SHOPIFY_API_CLIENT_KEY, TUNNEL_URL } = process.env;

module.exports = {
  mode: NODE_ENV === 'production' ? NODE_ENV : 'development',
  entry: ['./client/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SHOPIFY_API_CLIENT_KEY': JSON.stringify(SHOPIFY_API_CLIENT_KEY),
      'process.env.TUNNEL_URL': JSON.stringify(TUNNEL_URL),
    }),
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
};
