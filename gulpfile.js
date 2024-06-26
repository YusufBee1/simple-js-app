const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('minify-css', () => {
  return gulp.src('dist/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', () => {
  return gulp.src('dist/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('minify-css', 'minify-js'));