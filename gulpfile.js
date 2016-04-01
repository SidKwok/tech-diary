var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jade        = require('gulp-jade');
var reload      = browserSync.reload;

gulp.task('serve', ['jade'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("jade/*.jade", ['jade']);
    gulp.watch(["./*.html", "./css/*.css"]).on('change', reload);
});

gulp.task('jade', function() {
    return gulp.src("jade/index.jade")
        .pipe(jade({
          pretty: true
        }))
        .pipe(gulp.dest("./"))
        .pipe(reload({stream: true}));
});


gulp.task('default', ['serve']);
