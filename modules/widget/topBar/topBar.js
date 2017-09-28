define('modules/widget/topBar/topBar', function(require, exports, module) {

  // 返回上一页
  var topbar_return = document.getElementsByClassName('topBar__btn--return')[0];
  
  topbar_return.onClick = function(){
  	history.back();
  }

});
