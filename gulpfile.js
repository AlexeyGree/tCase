'use strict';

const { groupCollapsed } = require('console');
const { globalAgent } = require('http');
var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    gcmq = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('autoprefixer'),
    server = require('browser-sync').create(),
    isDev = true,
    isBuild = false;

gulp.task('pug', function() {
  return gulp.src('source/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulpif(isBuild, htmlmin({collapseWhitespace: true})))
    .pipe(gulpif(isDev, gulp.dest('source/'), gulp.dest('app/')))
    .pipe(gulpif(isDev, server.stream()))
});

gulp.task('scss', function () {
  return gulp.src('source/pages/style.scss')
    .pipe(plumber())
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    // .pipe(gulpif(isDev, concat('style.css')))
    // .pipe(gulpif(isBuild, concat('style.min.css')))
    .pipe(gcmq())
    .pipe(gulpif(isBuild, cleanCSS()))
    .pipe(gulpif(isDev, sourcemaps.write('./')))
    .pipe(gulpif(isDev, gulp.dest('source/assets/css'), gulp.dest('app/css')))
    .pipe(gulpif(isDev, server.stream()))
});

gulp.task('js', function() {
  return gulp.src('source/blocks/**/*.js')
    .pipe(gulpif(isDev, concat('app.js'), concat('app.min.js')))
    .pipe(gulpif(isBuild, uglify()))
    .pipe(gulpif(isDev, gulp.dest('source/assets/js'), gulp.dest('app/js')))
    .pipe(gulpif(isDev, server.stream()))
});

gulp.task('server', function () {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  isDev = true;
  isBuild = false;

  gulp.watch('source/blocks/**/*.scss', gulp.series('scss'));
  gulp.watch('source/**/*.pug', gulp.series('pug'));
  gulp.watch('source/blocks/**/*.js', gulp.series('js'));
  gulp.watch('source/assets/index.html').on('change', server.reload);
});

// gulp.task('default', gulp.series('server'));

// gulp.task('default', function() {
//   isDev = true;
//   isBuild = false;
//   return gulp.series('server');
// });
gulp.task('default', gulp.series('server', 'pug', 'scss', 'js'));

gulp.task('build', function() {
  isDev = false;
  isBuild = true;
  return gulp.series('scss', 'pug', 'js')
});