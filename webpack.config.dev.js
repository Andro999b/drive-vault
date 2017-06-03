/* eslint-disable */
const webpack = require('webpack');

const config = {
  devtool :'source-map',
  plugins : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}
module.exports = config;