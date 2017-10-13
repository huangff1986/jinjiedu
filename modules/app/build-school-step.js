var $ = require('jquery');
var fastclick = require('fastclick');
require('modules/lib/jquery.validate.min');
fastclick.attach(document.body);

$(".g-toolbar__top").click(function(){
    $('html,body').animate({scrollTop: '0px'}, 800);
});
var $msgBtn = $('.g-toolbar__msg');

$popup      = $('.w-popup');
$popupClose = $('.popup__close');
$form       = $('.form');
$msgBtn     = $msgBtn;

$popupClose.click(function(){
    $popup.hide();
})


$msgBtn.click(function() {
    console.log('x');
    $popup.show();
})

function ajaxSubmit(){
    event.preventDefault();
    console.log($form.serialize());
    $.post("http://www.jinjiedu.com/index.php?s=/Home/Feedback/index.html", $form.serialize(), function(data) {
        if(data.code == 400) {
            alert(data.info);
        }else {
            alert(data.info);
            setTimeout(function() {location.reload();},2000)
        }
    }, "json");
    return false;
};

$(".form").validate({
    rules: {
        username: {
            required: true,
        },
        phone: {
            required: true,
            number: true
        }
    },
    messages: {
        username: {
            required: '请输入您的姓名!'
        },
        phone: {
            required: '请输入手机号码！',
            number: '请输入正确的手机号码！'
        }
    },
    errorPlacement: function(error, element) {
        error.appendTo(element.parent());
    },
    submitHandler: function() {
        ajaxSubmit();
    },
    errorElement: "p"
})
