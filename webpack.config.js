const webpack = require('webpack');

// resolve path of application
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'Client/dist');

// directory to serve and transpile app from
const SRC_DIR = path.resolve(__dirname, 'Client/src');

// webpack configuration
const config = {
  // file to start transpiling from
  entry: SRC_DIR + '/App.js',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/'
  },
  // modules for transpiling
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  }
};

module.exports = config;
