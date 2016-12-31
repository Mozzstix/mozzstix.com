const path = require('path');
const webpack = require('webpack');
const Extract = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd ? false : 'source-map',
  entry: {
    'javascripts/main': './src/javascripts/main.js',
    'stylesheets/main': './src/stylesheets/main.scss'
  },
  output: {
    path: path.join(__dirname, 'static/assets'),
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|vendor/,
        loader: 'babel'
      },
      {
        test: /\.s?css$/,
        loader:  Extract.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader',
           'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: "file-loader?name=[path][name].[hash:base64:5].[ext]"
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json']
  },
  plugins: [
    new ManifestPlugin(),
    new Extract(isProd ? '[name].[chunkhash].css' : '[name].css')
  ]
};
