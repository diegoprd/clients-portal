'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

// FrontEnd related tasks
gulp.task('sass', function() {
  gulp.src('./web-app/styles/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./web-app/styles/css'))
});

gulp.task('watch-sass', function() {
  gulp.watch('./web-app/styles/scss/*.scss', ['sass']);
});

gulp.task('run-front', ['sass','watch-sass'], function() {
  gulp.src('web-app')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      open: true
    }));
});

// BackEnd related tasks
gulp.task('run-back', function () {
  nodemon({script: 'app.js', env: {'NODE_ENV': 'development'}, ext: 'js, html, scss'});
});

gulp.task('run-app', ['run-back', 'run-front']);

gulp.task('default', ['run-app']);