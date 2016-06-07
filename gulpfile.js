var gulp = require('gulp');
var fs = require('fs');
var babelify = require('babelify');
var browserify = require('browserify');

gulp.task('default', function () {
    var bundler = browserify('main.js');
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(fs.createWriteStream('bundle.js'));
});

gulp.task('watch', function () {
    gulp.watch('./Classes/**/*.js', ['default']);
});