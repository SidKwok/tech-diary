# webpack入门
## 2016.04.03

今天被赶出实验室了，心情异常郁闷，技术博客也提不起精神来写了。不过我的tech-diary也算叫做解决了好几个问题，也还好吧。

说说webpack。我觉得（只是个人觉得，感觉应该还有很多地方要补充）webpack就是将所有能打包成一个的东西都打包成一个，那么这样子的话模块化的在浏览器端的实现就显得异常地和谐。将所有模块分开写，然后最后webpack一下讲所有东西pack成一个，虽然不利于别人去阅读，但是很大程度上减少了页面加载时间，而且还不用担心全局变量污染的问题。虽然我对模块化编程的理解还不够，但是目前感觉还是挺方便的。

首先要写一个webpack.config.js：
```Javascript
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build/js');

module.exports = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
};

```
这是最基本的，还有`plugins`、`loaders`和`tools`，这些东西构成了webpack各种屌炸天的功能，但是我还没有开始使用，所以后面再聊。

结合gulp进行自动化：
```Javascript
gulp.task('webpack', function(){
  return gulp.src("app/index.js")
      .pipe(webpack(require("./webpack.config.js")))
      .pipe(gulp.dest("./build/js/"))
});
```
需要安装一个webpack-stream的插件，那么这样gulp一下就可以自动打包了，非常的方便。

据说结合着react来吃用会更爽，这要后面才知道。
