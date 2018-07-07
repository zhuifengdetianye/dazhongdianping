let pkg = require('./package.json')
let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let OpenBrowserPlugin = require('open-browser-webpack-plugin')
module.exports = {
  entry: {
      app: path.resolve(__dirname, 'app/index.jsx'),
      //将第三方依赖（node_modules中的）单独打包
      vender: Object.keys(pkg.dependencies)
  },

  output: {
    path: __dirname + "/build",
    filename: "/js/[name].[chunkhash:8].js"
  },
  resolve:{
    extensions:['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  },
  plugins: [
    
    //webpack内置的banner-plugin
    new webpack.BannerPlugin("Copyright by nianhuawuxiaoxin@yeah.net"),

    //html模板插件
    new HtmlWebpackPlugin({
        template: __dirname + '/app/index.tmpl.html'
    }),

    //定义为生产环境，编译React时压缩到最小
    new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }),
    //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小ID
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),

    //分离CSS和JS文件
    new ExtractTextPlugin('/css/[name].[chunkhash:8].css'),

    //提取公共代码
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vender',
        filename: '/js/[name].[chunkhash:8].js'
    }),
    //可以在业务js代码中使用__DEV__判断是否是dev模式
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
      })
  ],

  devServer: {
    colors: true, //终端中输出结果为彩色
    historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML History API
    inline: true, //实时刷新
    hot: true //使用热加载插件HotModuleReplacementPlugin
  }
}
