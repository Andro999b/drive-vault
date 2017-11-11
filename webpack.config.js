/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const config = {
  entry: {
    'gdrive': './src/index-gdrive'
  },
  output: {
    path: path.resolve(__dirname, './app'),
    filename: '[name].js',
    library: 'application'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'libs'),
      path.resolve(__dirname, 'src')
    ]
  },
  module: {
    rules: [
      { test:/\.jsx?$/, exclude: /node_modules/, enforce: "pre", use: 'eslint-loader' },
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader'},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }) },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.(gif|png|svg|jpe?g)$/i, loader: 'file-loader?name=images/[name].[ext]' },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join('src', 'index.html'),
      path: 'app',
      filename: 'index.html',
      inject: false
    }),
    new ExtractTextPlugin('styles.css')
  ],
  node: { fs: 'empty' }
};

module.exports = function(env) {
  return merge(config, require(`./webpack.config.${env}.js`))
}