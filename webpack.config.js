/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const config = {
  entry: {
    'main': './src/index'
  },
  output: {
    path: path.resolve(__dirname, './app'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
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
    }),
    new ExtractTextPlugin('styles.css')
  ],
  node: { fs: 'empty' }
};
if (process.env.NODE_ENV === 'production') {
  //config.devtool = 'hidden-source-map';
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      comments: false,
      sourceMap: true
    })
  ]);
} else {
  config.devtool = 'source-map';
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]);
}
module.exports = config;