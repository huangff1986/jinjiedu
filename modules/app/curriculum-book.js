var $ = require('jquery');
var fastclick = require('fastclick');
fastclick.attach(document.body);
var page=0;
//加载图片数据
function installData(){

    $.ajax({
        type:"GET",
        url:"/test/curriculum-book",
        contentType: 'application/json',
        dataType: "json",
        async: true,
        success: function(data){
            page++;
            if(data.bookList.length>page*6) {
                var str = "";
                for (var j = 0; j < 6; j++) {
                    var obj = data.bookList[page * 6 + j];
                    str += "<div class='g-list__item'><img src='" + obj.url + "' alt='' /><p>"+obj.content+"</p></div>";
                }
                    $(".g-list .item").append(str);
            }else{
                    $(".g-list__bulletin").text("已经到底了");
            }
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