// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PugPlugin = require('pug-plugin');

module.exports = function loaders () {
    return [
          {
            test: /\.pug$/,
            loader: PugPlugin.loader, // PugPlugin already contain the pug-loader
          },
          {
            test: /\.(css|sass|scss)$/,
            use: ['css-loader', 'postcss-loader', 'sass-loader']
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'images/[name].[contenthash][ext]',
            }
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[name].[contenthash][ext]',
            },
          },
          {
            test: /\.(ico|webmanifest)/,
            type: 'asset/resource',
          },
    ]
}