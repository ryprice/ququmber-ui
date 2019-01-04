const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

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
      'ququmber-ui': path.resolve('lib'),
      'ququmber-api': path.resolve('node_modules/ququmber-api/lib')
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
      {from: 'dist/ququmber-ui.css', to: 'ququmber-ui.css'}
    ]),
    new TSLintPlugin({
      files: ['src/**/*.ts', 'src/**/*.tsx']
    })
  ]
};
