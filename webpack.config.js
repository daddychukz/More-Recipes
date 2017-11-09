const webpack = require('webpack');

// resolve path of application
const path = require('path');
const Dotenv = require('dotenv-webpack');

const DIST_DIR = path.resolve(__dirname, 'Client/dist');

// directory to serve and transpile app from
const SRC_DIR = path.resolve(__dirname, 'Client/src');

// webpack configuration
const config = {
  // file to start transpiling from
  entry: path.resolve('./Client/src/app.js'),
  output: {
    path: path.resolve('./Client/dist/app'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    net: 'empty',
    dns: 'empty'
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
  },
  plugins: [
    new Dotenv({
      path: path.resolve('./.env'), // Path to .env file
      safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe) 
      systemvars: true
    })
  ],
};

module.exports = config;
