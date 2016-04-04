var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jade        = require('gulp-jade');
var webpack     = require('webpack-stream');
var markdown    = require('gulp-markdown');
var frontMatter = require('gulp-front-matter');
var layout      = require('gulp-layout');
var createcss   = require('./app/createcss');
var ghPages     = require('gulp-gh-pages');
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

gulp.task('posts', function() {
  return gulp.src('post/*.md')
    .pipe(markdown())
    .pipe(layout({
      layout: './app/jade/layout.jade'
    }))
    .pipe(gulp.dest('./build/_post'));
});

gulp.task('createcss', function() {
  createcss();
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});


gulp.task('default', ['serve']);

gulp.task('build', ['createcss', 'jade', 'webpack', 'posts']);
