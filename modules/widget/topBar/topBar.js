// 返回上一页
var topbar_return = document.getElementsByClassName('topBar__btn--return')[0];
topbar_return.onclick = function(){
	history.back();
}