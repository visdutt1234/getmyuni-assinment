var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('sass', function() {
    gulp.src('./sass/components/dev.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./style/'));
});



//Minify all CSS
gulp.task('minifycss', function() {
   return gulp.src('./style/dev.css')
       .pipe(cleanCSS({debug: true}, function(details) {
           console.log( "%s : %s -> %s", details.name, details.stats.originalSize, details.stats.minifiedSize);
       }))
       .pipe(rename({
           suffix: '.min'
       }))
       .pipe(gulp.dest('./style/min/'));
});


// Gulp Watch
gulp.task('watch', function(){
 gulp.watch('./sass/**/*.scss', ['sass']);
// gulp.watch('./src/static/css/style.css', ['minifycss']);
})


// Gulp Default
gulp.task('default', function(callback) {
   runSequence(
       'sass',
       'minifycss',
     callback);
});