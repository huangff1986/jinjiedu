var $ = require('jquery');
require('../../lib/jquery.validate.min.js');
var bottomBar = require('../bottomBar/bottomBar.js');




$popup      = $('.w-popup');
$popupClose = $('.popup__close');
$form       = $('.form');
$msgBtn     = bottomBar.$msgBtn;

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