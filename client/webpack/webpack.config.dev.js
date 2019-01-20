var defaultConfig = require('./webpack.config.js');

module.exports = {
  ...defaultConfig,
  devtool: 'eval-source-map',
}