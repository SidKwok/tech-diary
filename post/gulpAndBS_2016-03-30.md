# Gulp+BrowserSync优化工作流
## 2016.3.30

最近在重新弄自己的博客，以前用的是别人的主题通过Jekll构建的。作为一名前端开发者总感觉酱紫怪怪的，所以我就把那个博客删了，重新做一个喽～

静态网页嘛，所以总要涉及不断的改变样式与布局，那么就要按好多好多的F5，这样一点都不够Geek。

所以就来个无刷新的吧。

最近在学Node.js，那就把Gulp当练手吧。

Node.js的安装和配置就不说了，直接安装Gulp：
```
npm install gulp -g
```

然后再安装一个神器BrowserSync，它的神不仅仅在于不用手动点击F5，后面慢慢研究：
```
npm install browser-sync -g
```

我还得顺便学一把sass，so:
```
npm install gulp-sass --save=dev
```

同样地，sass的安装和配置就不缩了，反正自己看。

接着，写一个`gulpfile.js`:

```
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    // 监视sass中的所有.scss文件，有改动的话就执行任务sass
    gulp.watch("sass/*.scss", ['sass']);

    // 监视根目录的.html文件，有改动就reload browsersync
    gulp.watch("./*.html").on('change', reload);
});

gulp.task('sass', function() {
    return gulp.src("sass/style.scss")  // 对style.scss进行编译
        // 异步编译，编译错误的话就停止编译到css中，就是跳过下一个操作，直接reload
        .pipe(sass().on('error', sass.logError))
        // 编译到css中
        .pipe(gulp.dest("css"))
        // reload
        .pipe(reload({stream: true}));
});

// 默认的task， 直接gulp
gulp.task('default', ['serve']);
```

对的，就是这样就好了，后面有更高级的操作再说，先完成我叼炸天的主页。
