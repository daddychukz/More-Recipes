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
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // modules for transpiling
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.(woff|png|jpg|gif)$/,
        loader: 'url-loader?limit=250000'
      }
    ]
  }
};

module.exports = config;
