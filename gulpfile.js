var gulp = require('gulp')
, minifyCss = require('gulp-minify-css')
, concat = require('gulp-concat')
, uglify = require('gulp-uglify')
, sass = require('gulp-sass')
, imageop = require('gulp-image-optimization');

gulp.task('compile-sass', function () {
    gulp.src('./static/assets/styles/main.scss') // path to your file
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./static/assets/css'));
});

gulp.task('minify-css', function () {
    gulp.src('./static/assets/css/main.css') // path to your file
    .pipe(minifyCss())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./static/dist/css'))
});

gulp.task('minify-js', function () {
    gulp.src('./static/assets/js/**/*.js') // path to your files
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('./static/dist/js'));
});

gulp.task('images', function(cb) {
    gulp.src(['./static/assets/img/**/*.png',
        './static/assets/img/**/*.jpg',
        './static/assets/img/**/*.gif',
        './static/assets/img/**/*.jpeg'])
        .pipe(imageop({
          optimizationLevel: 5,
          progressive: true,
          interlaced: true
    })).pipe(gulp.dest('./static/dist/img')).on('end', cb).on('error', cb);
});

gulp.task('watch', function() {
  gulp.watch('./static/assets/**/*.scss', ['compile-sass']);
  gulp.watch('./static/assets/**/*.css', ['minify-css']);
  gulp.watch('./static/assets/js/**/*.js', ['minify-js']);
  gulp.watch(['./static/assets/img/**/*.png',
      './static/assets/img/**/*.jpg','./static/assets/img/**/*.gif',
      './static/assets/img/**/*.jpeg'],
      ['images']
  );
});

gulp.task('default', ['compile-sass', 'minify-css', 'minify-js', 'images'], function() {
});
