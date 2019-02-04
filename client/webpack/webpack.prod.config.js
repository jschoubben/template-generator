var defaultConfig = require('./webpack.shared.config.js')
var webpack = require('webpack')

module.exports = env => {
  return {
    ...defaultConfig,
    plugins: [
      ...defaultConfig.plugins,
      new webpack.DefinePlugin({
        "API_URL": 'http://35.246.241.43/'
      })
    ],
    mode: 'production',
  }
}