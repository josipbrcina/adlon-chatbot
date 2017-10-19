const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  //entry: ['babel-polyfill', APP_DIR + '/index.jsx'],
  entry: [APP_DIR + '/index.js'],
  devServer: {
    hot: true,
    inline: true,
    port: 4000,
    host: '0.0.0.0',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  watchOptions: {
    poll: true
  },
  devtool: 'eval',
  output: {
    path: BUILD_DIR,
    filename: 'app.js',
    publicPath: 'https://localhost:4000/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {}
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ],
    loaders: []
  },
  plugins: []
};

module.exports = config;
