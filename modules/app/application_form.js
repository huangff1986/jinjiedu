var $ = require('jquery');
var fastclick = require('fastclick');
require('modules/lib/jquery.validate.min');
fastclick.attach(document.body);
require('modules/app/linkageProvinceCity');
/*
* 复选框
* */
$(".g-agreement__checkbox").click(function(){
    if($(this).hasClass("checked")){
        $(this).removeClass("checked");
        $(".g-agreement__checkValue").val(0);
        $(".g-form__submit").attr("disabled","disabled");
    }else{
        $(this).addClass("checked");
        $(".g-agreement__checkValue").val(1);
        $(".g-form__submit").removeAttr("disabled");
    }
});
$(".g-agreement__checkbox").click();
$("textarea").focus(function(){
    var val=$(this).val();
    if($(this).val().indexOf("请输入文字")>=0){
        $(this).val("");
        $(this).addClass("normal");
    }else{
        $(this).addClass("normal");
    }
});
$("textarea").blur(function(){
    var val=$(this).val();
    if(val!=""){
        if($(this).val().indexOf("请输入文字")>=0){
            $(this).val(val);
            $(this).removeClass("normal");
        }else{
            $(this).addClass("normal");
        }
    }else{
        $(this).val("请输入文字");
        $(this).removeClass("normal");
    }

});
$("select").change(function(){
    if($(this).val()!=""){
        $(this).addClass("normal");
    }else{
        $(this).removeClass("normal");
    }
});
$("body").delegate(".g-form__radio","click",function(){
    $(this).siblings(".g-form__radio").removeClass("checked");
    $(this).addClass("checked");
    $(this).siblings("input").val($(this).attr("data"));
});

/**评星**/
var curNum=$("#star").attr("data-score");
for(var i=0;i<curNum;i++){
    $("#star i").eq(i).addClass("on");
}
$("#star i").click(function(){
    var index=$("#star i").index($(this));
    $("#star i").removeClass("on");
    for(var j=0;j<=index;j++){
        $("#star i").eq(j).addClass("on");
    }
    $(this).parents("li").find("input").val($(this).attr("data-score"))
});

$("body").delegate(".g-auxiliary__add","click",function(){
    if($(".g-auxiliary").length<3){
        var html=$(".g-auxiliary").eq(0).clone();
        $(".g-form__submit").before(html);
        $(".g-auxiliary").last().find("input").val("");
        $(".g-auxiliary").not($(".g-auxiliary").eq(0)).find(".colsed_btn").show();
    }else{
        alert("参会人员不得多于三人！");
    }
    if($(".g-auxiliary").length==3){
        $(".g-auxiliary").eq(2).find(".g-auxiliary__add").remove();
    }
});
$("body").delegate(".colsed_btn","click",function(){
    if(confirm("是否确定删除该参会人信息？")){
        $(this).parents(".g-auxiliary").remove();
    }
});
$(".g-form__file").click(function(){
    $(this).find("input").click();
});
$(".g-form__file input").change(function(){
   $(this).parents("li").find(".reslut").text($(this).val()) ;
   // $(this).parents("li").find(".reslut").find("img").attr("src",$(this).val());
});