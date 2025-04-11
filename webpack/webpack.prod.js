const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js', // 带哈希的文件名
    path: path.resolve(__dirname, '../dist'),
    clean: true
  },
  module: {
    rules: [
      // CSS/SCSS/LESS 规则（生产环境使用 MiniCssExtractPlugin）
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'] }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css' // 独立 CSS 文件
    })
  ]
});
