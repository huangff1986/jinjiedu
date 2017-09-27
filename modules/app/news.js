/**************基础JS***************/
var $ = require('jquery');
var fastclick = require('fastclick');

/*第三方插件*/
// Swiper
var Swiper = require('swiper');
require('swiper/swiper.css')

fastclick.attach(document.body); 
/************基础JS end *************/



/***************页面代码*****************/
// banner
var banner = new Swiper('.g-banner__swiper', {
	loop: true,
	pagination: '.swiper-pagination-banner'
})


// 新闻
var $btns        = $('.btns__item');
var $bulletinBtn = $($btns[0]); // 新闻公告按钮
var $treatiseBtn = $($btns[1]); // 总裁论述按钮
var $list        = $('.list');  // 新闻列表
var $tips        = $('.tips');  // 提示信息

var config = {
    url : '', // 异步地址
    page: 0,
}

// 
config.url = $bulletinBtn.data('url');

installData();

// 点击事件
function onBtnClick() {
	var $this = $(this);
	cleanNews();
	$btns.removeClass('btns__item--active');
	$this.addClass('btns__item--active');
    config.url = $this.data("url"); // 配置异步地址
	installData()
}

$btns.on('click', onBtnClick)


// 新增新闻
function addNews( data ) {
	var tpl = 
		'<li class="list__item">'+ 
			'<a href="'+ data.url +'" class="item__warp">' +
				'<div class="time">' +
	    			'<div class="time__day">' + data.day + '</div>' +
	    			'<div class="time__year">' + data.year + '</div>' +
	    		'</div>' +
				'<div class="content">' +
					'<h1>' + data.title + '</h1>' +
					'<h3>' + data.abstract + '</h3>' +
				'</div>' +
			'</a>' +
		'</li>';
	var string2dom = $(tpl)[0];
    $list.append(string2dom);
}

function cleanNews() {
	$list.empty()
}

//加载新闻
function installData(){
    $.ajax({
        type:"GET",
        url : config.url,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        success: function(data){
            $.each(data.news,function(i,e){
            	addNews(e);
            });
            
            $tips.text("已经到底了");
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

//获取窗口可视范围的高度
function getClientHeight(){
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight){
        clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }else{
        clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    return clientHeight;
}

function getScrollTop(){
    var scrollTop=0;
    scrollTop=(document.body.scrollTop>document.documentElement.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop;
    return scrollTop;
}

$(window).scroll(function(){
    //可视窗口的高度
    var scrollTop = 0;
    var scrollBottom = 0;
    var dch = getClientHeight();
    scrollTop = getScrollTop();
    scrollBottom = document.body.scrollHeight - scrollTop;
    if(scrollBottom >= dch && scrollBottom <= (dch+10)){
        installData();
    }
})