process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const environment = require('./environment');

if (process.env.BUNDLE_ANALYZE) {
  const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

  environment.plugins.append(
    'BundleAnalyzer',
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: false,
    })
  );
}

module.exports = environment.toWebpackConfig();
