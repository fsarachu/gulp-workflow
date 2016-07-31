var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('cleanCss', ['sass'], function () {
  return gulp.src('src/css/all.css')
      .pipe(cleanCss())
      .pipe(gulp.dest('dist/styles.css/'));
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });
});
