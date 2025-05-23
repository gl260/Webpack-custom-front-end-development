const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  // entry: './src/main.js', //  Webpack 的运行上下文（context）默认是项目的根目录，而不是配置文件所在的目录。所以不能写成../src/main.js
  entry: path.resolve(__dirname, '../src/main.js'), // 可以写成绝对路径
  resolve: {
    // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
    extensions: ['.js'],
    alias: { '@': path.resolve(__dirname, '../src') }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
        generator: { filename: 'img/[name]_[hash:8][ext]' }
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],

        // 把 loader 应用的文件范围缩小
        exclude: /node_modules/ // 排除node_modules文件夹
        // include: path.resolve(__dirname, '../src') // 只编译src下的js文件
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '大大怪将军',
      // template: './public/index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico') // favicon图标
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify('./')
    })
  ]
};
