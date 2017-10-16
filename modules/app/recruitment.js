var $ = require('jquery');
var fastclick = require('fastclick');
fastclick.attach(document.body);

var itemSwtchFlag=0;
$(".g-solution__item").click(function() {
    var hasVisible = $(this).animate({height: tempHeight + "px"}).find(".solution__item--content").css("visibility") == "visible" ? true : false;
    if (hasVisible==false) {
        var eleHeight = $(this).outerHeight();
        var tempHeight = $(this).find(".solution__item--content").height() + eleHeight;
        if (itemSwtchFlag != 0) {
            $(".g-solution__item").animate({height: eleHeight},500);
            setTimeout($(".g-solution__item").find(".solution__item--content").css({"visibility": "hidden"}),1000);
        }
        itemSwtchFlag++;
        $(this).animate({height: tempHeight + "px"},500);
        setTimeout($(this).find(".solution__item--content").css({"visibility": "visible"}),1000);
    }
});


