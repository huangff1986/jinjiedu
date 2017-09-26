/**************基础JS***************/
var $ = require('jquery');
var fastclick = require('fastclick');

/*第三方插件*/
// Swiper
var Swiper = require('swiper');
require('swiper/swiper.css')

// 滚动插件
var iscroll = require('iscroll')
// 引入自定义组件

fastclick.attach(document.body); 
/************基础JS end *************/



/***************页面代码*****************/
// banner
var banner = new Swiper('.g-banner__swiper', {
	loop: true,
	pagination: '.swiper-pagination-banner'
})


// 新闻
var $bulletinBtn = $('.btns__item')[0]; // 新闻公告按钮
var $treatiseBtn = $('.btns__item')[1]; // 总裁论述按钮
var $list        = $('.list-warp')[0];  // 新闻列表

var list = new iscroll('.list-warp', {
	mouseWheel: true,
	scrollbars: true
});

