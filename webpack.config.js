const path = require('path');
const {
  eslintLoaderConfig,
  tsLoaderConfig,
  sassLoaderConfig,
  pluginsConfig,
} = require('../listlab-build/webpackConfigBuilders');

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
      eslintLoaderConfig(),
      sassLoaderConfig(),
    ]
  },

  plugins: pluginsConfig('prod'),
};
