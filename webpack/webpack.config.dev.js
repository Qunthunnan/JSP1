const { merge } = require('webpack-merge'),
      common = require('./webpack.config.common.js'),
      devServer = require('./buildDevServer.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: devServer(),
});