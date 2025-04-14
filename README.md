# Webpack-custom-front-end-development
Customize front-end development environment using webpack



### 图片优化

#### **image-minimizer-webpack-plugin (官方推荐)**

```shell
npm install --save-dev image-minimizer-webpack-plugin sharp
```

```js
// webpack.prod.js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify, // 使用 sharp
          // 或使用 squoosh
          // implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              // 压缩配置（按格式细分）
              jpeg: { quality: 70, mozjpeg: true }, // JPEG 质量 70%，启用 MozJPEG 优化
              png: { quality: 70, compressionLevel: 6 }, // PNG 质量 70%，压缩级别 6
              webp: { lossless: false, quality: 75 }, // WebP 质量 75%
              avif: { quality: 60 }, // AVIF 质量 60%
              gif: {}, // GIF 使用默认压缩
            },
          },
        },
      }),
    ],
  },
};
```



* `image-webpack-loader`和`imagemin-webpack-plugin`
  * 这两个方式好像已经被弃用了 npm install不了
  * 查阅相关资料，发现这两个库仍然在维护，但可能在某些版本中进行了调整
  * 可能是某些依赖项的问题，比如某些底层的图像处理库不再维护



* 我们在使用这些webpack的方式来压缩图片，在对webpack构建性能要求 不高的时候是一种很简便的处理方式，但是要考虑提高webpack的构建速度时，就需要思考一下是否有必要在webpack每次构建都处理一次图片压缩
* 一种解决思路，我们可以直接使用 [imagemin](https://github.com/imagemin/imagemin-cli) 来做图片压缩，编写简单的命令即可。然后使用 [pre-commit](https://github.com/observing/pre-commit) 这个类库来配置对应的命令，使其在 `git commit` 的时候触发，并且将要提交的文件替换为压缩后的文件。
* 这样提交到代码仓库的图片就已经是压缩好的了，以后在项目中再次使用到的这些图片就无需再进行压缩处理了