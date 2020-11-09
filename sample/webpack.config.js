const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const {eslintLoaderConfig, tsLoaderConfig} = require('listlab-build/webpackConfigBuilders');

module.exports = {
  entry: {
    'sample': './sample/index',
    'ququmber-ui': './src/index.sass',
    'sample-styles': './sample/index.sass',
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/sample/build',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.sass', '.html'],
    alias: {
      'ququmber-ui': path.resolve('src'),
      'listlab-api': path.resolve('node_modules/listlab-api/src')
    }
  },

  devtool: 'source-map',

  devServer: {
    inline: true,
    port: 3001,
    historyApiFallback: {
      rewrites: [
        { from: 'index.html', to: '/sample/index.html' },
      ]
    }
  },

  module: {
    rules: [
      tsLoaderConfig(),
      eslintLoaderConfig('ququmber-ui'),
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: { includePaths: ['../ququmber-ui/lib'] }
          },
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({filename: 'css/[name].css'}),
    new StyleLintPlugin({syntax: 'sass', files: '**/*.sass'})
  ],
};
