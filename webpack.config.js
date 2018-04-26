let path = require('path');
const webpack = require('webpack');
let WebpackNotifierPlugin = require("webpack-notifier");

module.exports = env => ({
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src/app'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'output')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    watchContentBase: true,
    contentBase: path.resolve(__dirname, "output"),
    port: 3000,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV':JSON.stringify('development')}),
    new WebpackNotifierPlugin({alwaysNotify: true}),
  ]
});