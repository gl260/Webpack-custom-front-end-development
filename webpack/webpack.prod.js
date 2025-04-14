const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

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
  ],
  optimization: {
    minimizer: [
      // 加了这个图片压缩后,js代码没有帮我压缩,为什么?
      // Webpack 的 `optimization.minimizer` 允许用户自定义压缩工具，但如果用户手动配置了这个数组，Webpack 就不会再使用默认的压缩插件（如 `TerserWebpackPlugin`）
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify, // 使用 sharp
          options: {
            encodeOptions: {
              // 压缩配置（按格式细分）
              jpeg: { quality: 70, mozjpeg: true }, // JPEG 质量 70%，启用 MozJPEG 优化
              png: { quality: 70, compressionLevel: 6 }, // PNG 质量 70%，压缩级别 6
              webp: { lossless: false, quality: 75 }, // WebP 质量 75%
              avif: { quality: 60 }, // AVIF 质量 60%
              gif: {} // GIF 使用默认压缩 不支持 GIF 压缩，需配合其他工具
            }
          }
        }
      })
    ]
  }
});
