const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const {
  eslintPluginConfig,
  tsLoaderConfig,
  parseCommandLineArgs
} = require('listlab-build/webpackConfigBuilders');

module.exports = (env) => {
  const {target} = parseCommandLineArgs(env);

  return {
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
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['../ququmber-ui/lib']
                }
              }
            },
          ]
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({filename: 'css/[name].css'}),
      new StyleLintPlugin({syntax: 'sass', files: '**/*.sass'}),
      eslintPluginConfig('ququmber-ui'),
    ],

    mode: target === 'local' ? 'development' : 'production',
  };
};
