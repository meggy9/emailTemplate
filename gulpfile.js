var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source');
    browserSync = require('browser-sync').create();


gulp.task('serve', function() {
    browserSync.init({
        server: "./dist/basic.html"
    });
});

//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

//CONVERTE INKY
gulp.task('inky', ['styles'], function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('inky-watch', ['inky'], function(done) {
    browserSync.reload();
    done();
});

//WATCH
gulp.task('default',function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./scss/**/*.scss', './templates/**/*.html'],['inky-watch']);
});
