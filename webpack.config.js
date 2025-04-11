const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

/**
 * "dev": "cross-env NODE_ENV=development webpack server --mode development --stats minimal",
 * "build": "cross-env NODE_ENV=production webpack --mode production",
 */

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'aaa.js',
    path: path.resolve(__dirname, './dist'),
    clean: true // 自动清理dis文件夹
  },
  devServer: {
    // hot: true, // webpack4+ webpack-dev-server 就默认启用了热更新功能 不需要额外的配置(可以省略)
    open: true, // 自动打开浏览器
    port: 9527
  },
  resolve: {
    // extensions: 解析到文件时自动添加扩展名,默认值是 ['.wasm', '.mjs', '.js', '.json']
    extensions: ['.js', '.json', '.vue', '.jsx', '.ts', '.tsx', '.css', '.less', '.scss'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      // postcss-loader 自动添加浏览器前缀
      // 生产环境下使用 mini-css-extract-plugin 替代 style-loader，以生成独立 CSS 文件
      { test: /\.css$/, use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader', 'postcss-loader'] },
      { test: /\.scss$/, use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader', 'postcss-loader'] }, // 除了要sass-loader外,还需额外安装sass
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 最大大小,小于60kb就转base64,大于60就单独打包
            maxSize: 60 * 1024
          }
        },
        generator: {
          filename: 'img/[name]_[hash:8][ext]'
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '大大怪将军',
      template: './public/index.html',
      favicon: path.resolve(__dirname, './public/favicon.ico') // favicon图标
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify('./')
    }),
    // 生产环境添加 MiniCssExtractPlugin
    ...(isProd
      ? [
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css' // 输出到 css 文件夹，带哈希
          })
        ]
      : [])
  ]
};
