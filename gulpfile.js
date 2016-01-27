'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jscs = require('gulp-jscs');

gulp.task('run-app', function() {
  nodemon({
    script: 'app.js',
    env: {'NODE_ENV': 'development'},
    ext: 'js, html'
  });
});

gulp.task('jscs', function() {
  gulp.src('./*/*.js')
    .pipe(jscs());
});

gulp.task('default', ['jscs', 'run-app']);
