const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: {
    'sample': './sample/index',
    'sample-styles': './sample/index.sass'
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/sample/build',
    libraryTarget: 'amd'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.sass'],
    alias: {
      'ququmber-ui': path.resolve('lib'),
      'listlab-api': path.resolve('node_modules/listlab-api/lib')
    }
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.sass$/,
        loader: [
          ExtractTextPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: { includePaths: ['../ququmber-ui/lib'] }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {from: 'dist/ququmber-ui.css', to: 'ququmber-ui.css'}
    ]),
    new TSLintPlugin({
      files: ['src/**/*.ts', 'src/**/*.tsx']
    }),
    new StyleLintPlugin({
      syntax: 'sass'
    })
  ]
};
