const { environment } = require('@rails/webpacker');
const dotenv = require('dotenv');

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env',
];

dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true });
});

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
