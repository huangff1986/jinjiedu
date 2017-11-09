/**************基础JS***************/
var $ = require('jquery');
var fastclick = require('fastclick');

/*第三方插件*/
// Swiper
var Swiper = require('swiper');
require('swiper/swiper.css')

fastclick.attach(document.body); 
/************基础JS end *************/
//双十一活动
$("body").on("touchmove",function(event){
    event.preventDefault;
}, false);
$(".g-activity").height(document.documentElement.clientHeight);
$(".g-activity__colse").click(function(){
    $("body").off("touchmove");
    $(".g-activity").hide();
    $(".g-activity__hd").addClass("actity");
});
	setTimeout(function(){
        $("body").off("touchmove");
		$(".g-activity").hide();
		$(".g-activity__hd").addClass("actity");
	},8000);
// 代码部分
var banner = new Swiper('.g-banner__swiper', {
	loop: true,
	autoplay: 3000,
	pagination: '.swiper-pagination-banner'
})


var rollBox = new Swiper('.g-rollBox__content', {
	direction : 'vertical',
	autoplay: 3000,
	loop: true
})

var hot = new Swiper('.g-hot__banner', {
	loop: true,
	autoplay: 3000,
	pagination: '.swiper-pagination-hot'
})


var school = new Swiper('.g-school__banner', {
	autoplay: 3000,
	loop: true,
})