const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootDir = path.resolve(__dirname, '..')

module.exports = {
  entry: {
    main: [
      rootDir + '/src/index.js', 
      rootDir + '/styles/styles.scss'
    ]
  },
  output: {
    path: rootDir + '/public',
    filename: 'main.js'
  },
  module: {
    rules: [{
        test: /\.(html)$/,
        use: 'html-loader'
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(s?css)$/,
        include: [
          path.resolve(rootDir,'src')
        ],
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /styles\.scss$/,
        include: [
          path.resolve(rootDir, 'styles')
        ],
        use: ExtractTextPlugin.extract(['raw-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: rootDir + '/src/index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }])
  ]
}