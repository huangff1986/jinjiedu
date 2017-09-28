// 设置项目属性
fis.set('project.name', ''); // 项目名称
fis.set('project.web', 'http://www.m.me'); // 静态资源部署路径
fis.set('project.static', '/public/home'); // 静态资源部署路径
fis.set('project.files', ['*.html', 'map.json', '/mock/**']); // 指定需要编译的文件和改文件的引入支援

// 引入模块化开发插件， 设置规范为 commonJs 规范。

fis.hook('commonjs', {
	baseUrl: './modules',
	extList: ['.js', '.es']
});

/********************目录规范************************/

// 开通同名设置，模板会将同名的css、js同时引入
fis.match('/modules/**', {
	useSameNameRequire: true
});

// ----- 全局配置
// 允许你在 js 中直接使用 
// fis可以智能的将图片转换为base64
// 当引入js时，js所依赖的css会被<link>方式加载进去
fis.match('*.js', {
	preprocessor: [
		fis.plugin('js-require-file'),
		fis.plugin('js-require-css', {
			mode: 'dependency'
		})
	]
});

// 配置图片压缩
fis.match('**.png', {
	optimizer: fis.plugin('png-compressor', {
		type: 'pngquant'
	})
});

// ----- 配置lib
fis.match('/lib/**.js', {
	release: '${project.static}/$&'
});

// ----- 配置components
fis.match('/components/**', {
	release: '${project.static}/$&'
});

fis.match('/components/**.css', {
	isMod: true,
	release: '${project.static}/$&'
});

fis.match('/components/**.js', {
	isMod: true,
	release: '${project.static}/$&'
});


// ----- 配置modules
fis.match('/modules/(**)', {
	release: '${project.static}/$1'
});

// 配置css
fis.match(/^\/modules\/(.*\.scss)$/i, {
	parser: fis.plugin('node-sass', {
		include_paths: ['modules/css', 'components']
	})
});

fis.match(/^\/modules\/(.*\.less)$/i, {
    parser: fis.plugin('less', {
        paths: []
    })
});

// px2rem autoprefixer
fis.match(/^\/modules\/(.*\.(scss|less|css))$/i, {
    rExt: '.css',
    isMod: true,
    release: '${project.static}/$1',
    postprocessor: [
    	fis.plugin('autoprefixer', {
    	        // browsers: ['IE >= 8', 'Chrome >= 30', 'last 2 versions'] // pc
    	        browsers: ['Android >= 4', 'ChromeAndroid > 1%', 'iOS >= 6'] // wap
    	}),
    	fis.plugin('px2rem', {
    		baseDpr: 2,    // dpr基准
    	    remUnit: 75,   // rem 基准
    	    remPrecision:6 // rem 精确位数
    	})
    ]
});

fis.match(/^\/modules\/(.*\.(?:png|jpg|gif))$/i, {
    release: '${project.static}/$1'
});

// 配置js
fis.match(/^\/modules\/(.*\.js)$/i, {
    isMod: true,
    release: '${project.static}/$1'
});


/***********************打包规范**************************/

// 通过loader加载依赖 
fis.match('::package', {
	postpackager: fis.plugin('loader', {
	    resourceType: 'commonJs',
	    useInlineMap: true // 资源映射表内嵌
	})
});

// debug后缀 不会压缩
var map = {
	'rd': {
		host: '',
		path: ''
	},
	'rd-debug': {
		host: ',',
		path: ''
	},
	'prod': {
        host: '${project.web}',
        path: '${project.static}'
    },
    'prod-debug': {
        host: '',
        path: ''
    }
};

// 通用 1.替换url前缀 2.天假md5吗 3.打包 4.合并 5.重新定义支援路径
Object.keys(map).forEach(function(v) {
	var o = map[v];
	var domain = o.host + o.path;

	fis.media(v)
		.match('**.js', {
			useHash: true,
			domain: domain
		})
		.match('**.{scss,less,css}', {
            useSprite: true,
            useHash: true,
            domain: domain
        })
        .match('::image', {
            useHash: true,
            domain: domain
        })
        .match('**/(*_{x,y,z}.png)', {
            release: 'pkg/$1'
        })
        .match('::package', {
            spriter: fis.plugin('csssprites', {
                layout: 'matrix',
                scale: 0.5, // 移动端二倍图用
                margin: '10'
            }),
            postpackager: fis.plugin('loader', {
                allInOne: true,
            })
        })
        .match('/components/**.css', {
            packTo: 'pkg/components.css'
        })
        .match('/components/**.js', {
            packTo: 'pkg/components.js'
        })
        // 将lib ui util 下的所有css打包在一起
        .match('/modules/**.{scss,less,css}', {
            packTo: 'pkg/modules.css'
        })
        // 不进行打包
        .match('/modules/css/**.{scss,less,css}', {
            packTo: ''
        })
        // common单独打包
        .match('/modules/css/common.scss', {
            packTo: 'pkg/common.css'
        })
        // 将lib ui util 下的js打包在一起
        .match('/modules/**.{es,js}', {
            packTo: 'pkg/modules.js'
        })
        // 会把所有页面js文件打包在一起
        .match('/modules/app/**.{es,js}', {
            packTo: 'pkg/pages.js'
        })
})

/***********************压缩规范**************************/
Object.keys(map)
	.filter(function(v) {
		return v.indexOf('debug') < 0
	})
	.forEach(function(v) {
		 fis.media(v)
		 	.match('**.{es,js}', {
                optimizer: fis.plugin('uglify-js')
            })
            .match('**.{scss,less,css}', {
                optimizer: fis.plugin('clean-css', {
                    'keepBreaks': true //保持一个规则一个换行
                })
            });
	});

// 本地产出发布
fis.media('prod')
	.match('**', {
		deploy: [
			fis.plugin('skip-packed', {
				ignore: []
			}),

			fis.plugin('local-deliver', {
                to: 'output'
            })
		]
	});

// 发布到指定的机器
['rd', 'rd-debug'].forEach(function(v) {
    fis.media(v)
        .match('*', {
            deploy: [
                fis.plugin('skip-packed', {
                    // 默认被打包了 js 和 css 以及被 css sprite 合并了的图片都会在这过滤掉，
                    // 但是如果这些文件满足下面的规则，则依然不过滤
                    ignore: []
                }),
                fis.plugin('http-push', {
                    receiver: 'xxx/fisreceiver.php',
                    to: 'xxx/' + fis.get('project.name')
                })
            ]
        });
});