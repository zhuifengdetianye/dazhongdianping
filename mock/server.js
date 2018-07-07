var app = require('koa')();
var router = require('koa-router')();
var koaBody = require('koa-body')();

//首页--广告（超值特惠）
var homeAdData = require('./home/ad.js')
router.get('/api/homead', function *(next){
    this.body = homeAdData
})

//首页--推荐列表（猜你喜欢）
var homeListData = require('./home/list.js')
router.get('/api/homelist/:city/:page', function *(next){
    //参数
    const params = this.params
    const paramsCity = params.city
    const paramsPage = params.page

    console.log('当前城市：'+ paramsCity)
    console.log('当前页数：'+ paramsPage)

    this.body = homeListData
})

//搜索页--列表
var searchListData = require('./search/list.js')
router.get('/api/searchlist/:page/:city/:type/:keyword', function *(next){
    //参数
    const params = this.params
    const paramsType = params.type
    const paramsKeyword = params.keyword
    const paramsCity = params.city
    const paramsPage = params.page

    console.log('当前页数：'+ paramsPage)
    console.log('当前城市：'+ paramsCity)
    console.log('当前类型：'+ paramsType)
    console.log('当前关键字：'+ paramsKeyword)

    this.body = searchListData
})

//详情页info
var infoData = require('./detail/info.js')
router.get('/api/detail/info/:id', function *(next){
    //参数
    const params = this.params
    const id = params.id
    console.log('饭店id: ' + id)

    this.body = infoData
})

//详情页comment
var commentListData = require('./detail/comment.js')
router.get('/api/detail/comment/:id', function *(next){
    //参数
    const params = this.params
    const id = params.id
    console.log('饭店id: ' + id)

    this.body = commentListData
})

//用户中心页user
var orderListData = require('./user/orderlist.js')
router.get('/api/user/orderlist', function *(next){
    //参数
    console.log('用户订单')

    this.body = orderListData
})

//提交用户评论
router.post('/api/submitcomment', function *(next){
    console.log('提交评论')

    //获取参数
    this.body = {
        'errno': 0,
        'msg': 'ok'
    }
})

//开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);