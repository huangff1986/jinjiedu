/**************基础JS***************/
var $ = require('jquery');
var fastclick = require('fastclick');
fastclick.attach(document.body); 
/************基础JS end *************/

console.log('已加载');

$list = $('.school__list');
$tips = $('.tips');
// 新增校区
function addNews( data ) {
    var tpl = 
            '<li class="school__item">' +
                '<img src="' + data.img + '" alt="' + data.title + '">' +
                '<a href="' + data.url + '"></a>' +
                '<span class="">' + data.title + '</span>' +
            '</li>';

    var string2dom = $(tpl)[0];
    console.log('asdf');
    $list.append(string2dom);
}

installData()

//加载图片数据
function installData(){
    $.ajax({
        type:"GET",
        url:"/mock/school",
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
        console.log(123);
        installData();
    }
})