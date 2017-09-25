目录说明
┌─components   // fis组件目录
├─img          //  html中用到的图片
├─lib          //  存放一些不用打包的js库
├─modules     //   项目组件  
│  ├─app      //   项目中用到的js
│  ├─css      //   项目中用到的css
│  ├─lib      //   第三方js （fis组件不包含的js）
│  ├─ui       //   UI 组件
│  └─util     //   工具组件
└─test        //   模拟测试数据


Fis components 的使用方式
 https://github.com/fis-components

fis3 install –save 组件名

FIS 插件安装列表
# hook类
fis3-hook-commonjs  // common.js模块插件

# parser类
fis-parser-node-sass // 支持 sass 语法

fis-parser-less      // 支持less语法  
fis-parser-template  // 模板语法
fis-parser-babel-5.x // ES6转 ES5


# preprocessor类
fis3-preprocessor-js-require-file  // 支持 JS 引入其他类型文件
fis3-preprocessor-js-require-css   // 支持 JS 引入css文件
fis-postprocessor-autoprefixer     // 自动添加厂商前缀     
fis3-postpackager-loader           //  静态资源前端加载器，用于打包js css文件
fis3-deploy-skip-packed             // 过滤掉已经被打包的资源.     
fis-postprocessor-px2rem           //  px 转换为 rem

npm install –g 
目录管理
Lib 目录
Lib 会将所有项目依赖的文件（带路径） 发送到 static目录下

Lib/*.*    =>   static/lib/*.*

Components 目录
Components下的所有项目依赖的文件（带路径） 发送到static

其中 js css 文件会加入到静态资源隐射表

Components  =>  static/ components/

Modules目录
Modules 下的所有文件去掉 modules路径 发送到 static

Scss less 

进行预编译，

然后将 scss less css 后缀全部改成.css  

并加入静态资源映射表

直接放到 static目录下 （后面打包后会自动删除）

添加厂商前缀

    Px2rem  转换输入的px值


Png jpg gif
    直接发送到 static目录下

Js
    加入静态映射列表
    直接发送到static目录下

Test目录
将所有的test目录下的文件移动到 部署目录的test下

Test下的server.conf  移动到 部署目录的 /config/server.conf

打包
四种打包方式
fis3 release prod-debug # 本地查看发布产品库状态
fis3 release prod # 发布产品库

fis3 release rd # 发布到指定机器
fis3 release rd-debug # 发布到指定机器调试


打包目录
打包思路：
    打包是以页面为单位进行打包，
多个页面通用部分的css/js文件会独立打包在一起。
页面自身的样式会单独打包。







一个页面所需要的包。

    js  css
Components(fis 组件)  components.js   components.css
Lib（开发） 单独打包    单独打包
/modules/css/（页面样式） /// 不打包
/modules/css/common.scss    /// 单独打包
/modules/widget(页面组件)   Modules.js  Modules.js
/modules/lib/   Modules.js  Modules.js
/modules/util/  Modules.js  Modules.js
Modules/app 所有页面JS打包一起 aio.js   ///
Modules/css /// 不进行打包
入口JS文件  Page.js 
        


页面所包含的包
Fis组件                :   Component.js / component.css
第三方组件/ 自定义组件 :   Modules.js   / Modules.css （  ）
所有页面JS             :   Aio.js
单个页面的css文件     :    page.css
通用样式文件           :   common
入口js文件            :    page.js


入口js文件
    入口文件不包含页面逻辑，只是一个页面js的资源列表。

    require.async('modules/app/index.js'); // 这条语句会更具沙面的支援列表去加载对应的js逻辑

    require.async('modules/app/index.js');
    <script src="lib/mod.js"></script>  // 打包后会替换为改页面的入口文件
    <script>
        require.async('modules/app/index.js');
    </script>




Js如何使用
在modules/app 以页面为单位去书写js。 

在对应的HTML中require.async('modules/app/index.js') 引入即可

其他的依赖会自动加载

JS的模块化

引入依赖支援

同步引入： 同步引入只要代码中与这条语句，先加载依赖再执行代码
var $ = require('jquery')；
require('lib-flexible')

异步引入：
require.async 执行到这段代码才会引入  （按需加载）

require.async (names, onload, onerror)  onload回调函数，当依赖加载完成后执行。


css如何使用
在modules/css 以页面为单位去书写css。 

Css与js不同的是需要在html中直接通过 link 标签引入即可
    <link rel="stylesheet" href="modules/css/common.scss">  // 通用样式文件
    <link rel="stylesheet" href="modules/css/index.scss">     // 页面样式
    <link rel="stylesheet" href="components/animate.css/animate.css"> // 其他样式

Fis会根据文件自动打包。







Js的基本环境
Jquery       ： 基础库
Fastclick      ：消除200ms延迟
lib-flexible    :  淘宝移动端布局方案

如果需要使用JS插件优先在fis components 里面找。 通过fis3 install –save 插件名 来安装




css的基本环境
基于 flexible 环境

切图的时候直接输入设计图的尺寸即可。Px2rem会自动转换成px

.selector {
  width: 150px;  // 使用rem单位
  height: 64px; /*px*/  // 使用px 单位
  font-size: 28px; /*px*/
  border: 1px solid #ddd; /*no*/  // 保持不变
}




组件的使用
组件在modules/widget/ 目录下创建

HTML CSS JS文件名称一致
例如
Footer\footer.html
Footer\footer.css
Footer\footer.js


引入方式: 

在页面html 中 
<link rel="import" href="modules/widget/footer/footer.html?__inline">

不过在page.js中需要引入组件js
