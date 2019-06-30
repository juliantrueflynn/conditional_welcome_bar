const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: './ui/index.js',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        APP_HOST_URL: JSON.stringify(process.env.APP_HOST_URL),
        SHOPIFY_CLIENT_KEY: JSON.stringify(process.env.SHOPIFY_CLIENT_KEY),
        GRAPHQL_API_URL: JSON.stringify(process.env.GRAPHQL_API_URL),
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
