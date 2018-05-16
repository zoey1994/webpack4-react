const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();



//首页-广告（超值特惠）
const homeAdData = require('./home/ad.js')
router.get('/api/homead',function (ctx){
	ctx.body = homeAdData
});


//首页-推荐列表（猜你喜欢）
const homeListData = require('./home/list.js');
router.get('/api/homelist/:city/:page',function(ctx){
	const params = ctx.params;
	const paramsCity = params.city;
	const paramsPage = params.page;

	ctx.body = homeListData;
})

//搜索结果页 - 搜索结果 - 三个参数
var searchListData = require('./search/list.js');
router.get('/api/search/:page/:cityName/:category/:keyword',function(ctx){
	const params = ctx.params;
	const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category
    const paramsKeyword = params.keyword

    ctx.body = searchListData
})

// 搜索结果页 - 搜索结果 - 两个参数
router.get('/api/search/:page/:city/:category', function(ctx) {

    // 参数
    const params = ctx.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category

    ctx.body = searchListData
})

//详情页 - 获取店面信息
var detailInfo = require('./detail/info.js');
router.get('/api/detail/info/:id',function(ctx){
	const params = ctx.params;
	const paramsId = params.id;

	ctx.body = detailInfo
})

//详情页 - 获取评论
var detailComment = require('./detail/comment.js');
router.get('/api/detail/comment/:page/:id',function(ctx){
	const params = ctx.params;
	const paramsId = params.id;

	ctx.body = detailComment;
})

//用户中心 - 订单列表
var orderList = require('./user/orderlist.js');
router.get('/api/user/orderlist/:username',function(ctx){
	ctx.body = orderList;
})

//用户中心 - 提交评论
router.post('/api/user/submitComment',function(ctx){
	ctx.body = {
		errno:0,
		msg:'ok'
	}
})

// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);