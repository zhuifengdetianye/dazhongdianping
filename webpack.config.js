let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let OpenBrowserPlugin = require('open-browser-webpack-plugin')
module.exports = {
  entry: path.resolve(__dirname, 'app/index.jsx'),

  output: {
    filename: 'bundle.js',
  },

  resolve:{
    extensions:['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {test: /\.(js|jsx)$/, exclude:/node_modules/, loader:'babel'},
      {test: /\.less$/, exclude: /node_modules/, loader:'style!css!postcss!less'},
      {test: /\.css$/, exclude:/node_modules/, loader:'style!css!postcss'},
      {test: /\.(pan|jpg|jpeg|bmp)$/i, loader:'url-loader?limit=5000'},
      {test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader:'url-loader?limit=5000'}
    ]
  },
  postcss: [
    require('autoprefixer') //调用autoprefixer插件，例如display：flex
  ],
  plugins: [
    //html模板插件
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html'
    }),

    //热加载插件
    new webpack.HotModuleReplacementPlugin(),

    //打开浏览器
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),

    //可以在业务js代码中使用__DEV__判断是否是dev模式
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ],

  devServer: {
    proxy: {
      //凡是‘/api’开头的http请求，都会被代理到localhost:3000
      //koa代码在./mock目录中，启动命令npm run mock
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    },
    colors: true, //终端中输出结果为彩色
    historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML History API
    inline: true, //实时刷新
    hot: true //使用热加载插件HotModuleReplacementPlugin
  }
}
