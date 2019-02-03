var defaultConfig = require('./webpack.shared.config.js')
var webpack = require('webpack')

module.exports = env => {
  return {
    ...defaultConfig,
    plugins: [
      ...defaultConfig.plugins,
      new webpack.DefinePlugin({
        "API_URL": JSON.stringify("http://10.51.241.26:3000/")
      })
    ],
    mode: 'production',
  }
}