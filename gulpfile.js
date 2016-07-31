var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('concat-css', ['sass'], function () {
  return gulp.src('src/css/!(all)*.css')
      .pipe(concat('all.css'))
      .pipe(gulp.dest('src/css'));
});

gulp.task('minify-css', ['concat-css'], function () {
  return gulp.src('src/css/all.css')
      .pipe(cleanCss())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('minify-html', function () {
  return gulp.src('src/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('watch', ['browser-sync', 'sass', 'minify-css', 'minify-html'], function () {
  gulp.watch('src/scss/**/*.scss', ['sass', 'minify-css']);
  gulp.watch('src/*.html', ['minify-html']);
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});
