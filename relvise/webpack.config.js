const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  stats: 'errors-warnings',
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'src/page'),
  entry: './landing.ts',
  resolve: {
    alias: {
      '@sections': path.resolve(__dirname, 'src/components/sections/'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules/'),
      '@icons': path.resolve(__dirname, 'src/assets/icons/'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
    },
  },
  output: {
    filename: 'index.js',
    clean: true,
  },
  devServer: {
    open: true,
    port: 9000,
    hot: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './landing.pug',
      minify: false,
    }),
    new MiniCSSExtractPlugin({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        test: /\.(c|sc)ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|jpg|png)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2)$/,
        type: 'asset/resource'
      }
    ],
  },
}
