var $ = require('jquery');
var fastclick = require('fastclick');
fastclick.attach(document.body);

$(".item-A__question--more").click(function(){
    $(".item-A__question").hide();
    $(".item-A__answer").show();
});
var itemA=$(".item-A");
$(window).scroll(function(){
    if (itemA.offset().top-400  <= $(window).scrollTop()) {
        $(".item-A__question").hide();
        $(".item-A__answer").show();
    }
});
function battery_rollback(){
    if($(".battery-progress").width()==$(".battery").width()){
        $(".battery-progress").width(0);
        $(".battery-progress").animate({
            width:"100%"
        },10000,battery_rollback);
    }
}
$(".battery-progress").animate({
    width:"100%"
},10000,battery_rollback);
