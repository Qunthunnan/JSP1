const { merge } = require('webpack-merge'),
      common = require('./webpack.config.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
});