var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jade        = require('gulp-jade');
var webpack     = require('webpack-stream');
var reload      = browserSync.reload;

gulp.task('serve', ['jade'], function() {

    browserSync.init({
        server: "./build/"
    });

    gulp.watch("app/*.js", ["webpack"]);
    gulp.watch("app/jade/*.jade", ['jade']);
    gulp.watch(["./build/*.html", "./build/css/*.css", "./build/js/*.js"]).on('change', reload);
});

gulp.task('jade', function() {
    return gulp.src("app/jade/index.jade")
        .pipe(jade({
          pretty: true
        }))
        .pipe(gulp.dest("./build/"))
        .pipe(reload({stream: true}));
});

gulp.task('webpack', function(){
  return gulp.src("app/index.js")
      .pipe(webpack(require("./webpack.config.js")))
      .pipe(gulp.dest("./build/js/"))
      .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
