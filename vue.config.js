const {defineConfig} = require('@vue/cli-service')
const compressionPlugin = require("compression-webpack-plugin")
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/node-serve': {
        target: 'http://localhost:7890/',
        changeOrigin: true,
        pathRewrite: {
          '^/node-serve': ''
        }
      }
    }
  },
  
  publicPath: './',
  
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        output: {
          libraryExport: 'default'
        },
        plugins: [
          new compressionPlugin({
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //对超过10kb的数据进行压缩
            deleteOriginalAssets: false //是否删除原文件
          })
        ]
      }
    }
    else {
      return {
        output: {
          libraryExport: 'default'
        },
        plugins: [
          new compressionPlugin({
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //对超过10kb的数据进行压缩
            deleteOriginalAssets: false //是否删除原文件
          })
        ]
      }
    }
  },
  
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/src/')
      .add('/examples/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
    
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  },
  
  productionSourceMap: false
})
