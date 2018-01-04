const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    sample: './sample/index'
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/sample/build',
    libraryTarget: 'amd'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'ququmber-ui': path.resolve('lib')
    }
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: [/node_modules/]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve('dist/ququmber-ui.css'),
        to: path.resolve('sample/ququmber-ui.css')
      }
    ])
  ]
};
