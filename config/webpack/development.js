const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const environment = require('./environment');
const path = require('path');

environment.plugins.append(
  'ForkTsCheckerWebpackPlugin',
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: path.resolve(__dirname, '../../tsconfig.json'),
    },
    eslint: {
      files: 'app/javascript/**/*.{ts,tsx,js}',
    },
    async: false,
  })
);

if (process.env.WEBPACK_DEV_SERVER) {
  environment.plugins.append(
    'ReactRefreshWebpackPlugin',
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockPort: 3035,
      },
    })
  );
}

module.exports = environment.toWebpackConfig();
