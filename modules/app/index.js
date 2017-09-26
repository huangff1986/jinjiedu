/**************基础JS***************/
var $ = require('jquery');
var fastclick = require('fastclick');

/*第三方插件*/
// Swiper
var Swiper = require('swiper');
require('swiper/swiper.css')
// 信息滚动
var NewScrollText = require('../lib/NewScrollText.js');
// 引入自定义组件

fastclick.attach(document.body); 
/************基础JS end *************/

// 代码部分
var banner = new Swiper('.g-banner__swiper', {
	loop: true,
	pagination: '.swiper-pagination-banner'
})


var rollBox = new Swiper('.g-rollBox__content', {
	direction : 'vertical',
	autoplay: 3000,
	loop: true
})

var hot = new Swiper('.g-hot__banner', {
	loop: true,
	pagination: '.swiper-pagination-hot'
})


var school = new Swiper('.g-school__banner', {
	autoplay: 3000,
	loop: true,
})