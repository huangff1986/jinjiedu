/*基础JS*/
var $ = require('jquery');
var fastclick = require('fastclick');


/*第三方插件*/
// Swiper
var Swiper = require('swiper');
require('swiper/swiper.css');
fastclick.attach(document.body);

//合作支持轮播
var mySwiper = new Swiper("#swiper1", {
   // loop: true,
    autoplay:3000,
    slidesPerView: "auto",
    centeredSlides: !0,
    watchSlidesProgress: !0,
    onProgress: function (a) {//, es.opacity =c.hasClass("swiper-slide-active")?1: 1 - Math.min(Math.abs(d / 2), 1)
        var b, c, d;
        for (b = 0; b < a.slides.length; b++) c = a.slides[b], d = c.progress, es = c.style, es.scale =(1 - Math.min(Math.abs(.2 * d), 1)), es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px) scale("+es.scale+","+es.scale+")"
    },
    onSetTransition: function (a, b) {
        for (var c = 0; c < a.slides.length; c++) es = a.slides[c].style, es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
    }
});