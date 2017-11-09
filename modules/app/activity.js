var $ = require('components/jquery/jquery');
$(function(){
    var tempHeight=document.documentElement.clientHeight;
   // $(".g-page").height(tempHeight);
    setTimeout(function(){
        location.href="index.html";
    },3000);
});