const path = require('path');
const fs = require('fs');
const {
  eslintPluginConfig,
  tsLoaderConfig,
  parseWebpackCommandLineArgs,
  stylelintPluginConfig
} = require('listlab-build/webpackConfigBuilders');

module.exports = (env) => {
  const {target} = parseWebpackCommandLineArgs(env);

  return {
    entry: {
      'sample': './sample/index',
    },

    output: {
      filename: '[name].js',
      path: __dirname + '/sample/build',
      libraryTarget: 'umd'
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.html'],
      alias: {
        'ququmber-ui': path.resolve('src'),
        'listlab-api': path.resolve('node_modules/listlab-api/src')
      }
    },

    devtool: 'source-map',

    devServer: {
      inline: true,
      port: 3001,
      host: 'local.listlab.io',
      historyApiFallback: {
        rewrites: [
          { from: 'index.html', to: '/sample/index.html' },
        ]
      },
      https: true,
      key: fs.readFileSync('../listlab-secrets/local.listlab.io.key'),
      cert: fs.readFileSync('../listlab-secrets/local.listlab.io.crt')
    },

    module: {
      rules: [
        tsLoaderConfig(target),
      ]
    },

    plugins: [
      stylelintPluginConfig(),
      eslintPluginConfig('ququmber-ui'),
    ],

    mode: target === 'local' ? 'development' : 'production',
  };
};
