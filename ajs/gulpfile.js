var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var livereload = require('gulp-livereload');
var webserver = require('gulp-webserver');

gulp.task('js', function () {
    gulp.src(['app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist')).pipe(livereload());
});

gulp.task('watch', ['js','webserver'], function () {
    livereload.listen();
    gulp.watch(['app/**/*.js', 'app/**/*.html'], ['js']);
})
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});