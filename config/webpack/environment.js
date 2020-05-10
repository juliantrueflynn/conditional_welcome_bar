const { environment } = require('@rails/webpacker');

environment.splitChunks((config) =>
  Object.assign({}, config, {
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  })
);

module.exports = environment;
