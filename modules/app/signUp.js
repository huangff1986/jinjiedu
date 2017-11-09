var $ = require('components/jquery/jquery');
require('modules/lib/jquery.validate.min');




$popup      = $('.w-popup');
$form       = $('.form');



function ajaxSubmit(){
    event.preventDefault();
    $.ajax({
        type:'post',
        url:"http://www.jinjiedu.com/index.php?s=/Home/Feedback/index.html",
        data:$form.serialize(),
        success:function(){
            if(data.code == 400) {
                alert(data.info);
            }else {
                alert(data.info);
                setTimeout(function() {
                    history.go(-1);
                    }
                    ,2000);
            }
        },
        error:function(){
            alert("留言失败");
            history.go(-1);
        }
    });
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
