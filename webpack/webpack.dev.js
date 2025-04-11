// const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  // devtool: 'cheap-module-source-map', // 生成source-map文件,方便调试
  // output: {
  //   filename: 'aaa.js',
  //   path: path.resolve(__dirname, '../dist'),
  //   clean: true
  // },
  devServer: {
    open: true,
    port: 9527,
    hot: true // 显式启用 HMR（Webpack 5 默认开启，但可显式配置）
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'] }
    ]
  }
});
