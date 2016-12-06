/**
 * gulpfile
 * author wusheng.xu
 * date 16/4/5
 */
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    minifycss = require('gulp-minify-css'), //css压缩
    uglify = require('gulp-uglify'); //js压缩


//浏览器同步测试
gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',//代理服务
        files: ['public/**/*.*', 'app/views/*.*'],
        browser: 'google chrome',
        notify: false,
        port: 5000 //浏览器打开的端口
    });
});
//启动node服务
gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'app.js',
        ext:'html js css',
        ignore: [
            'node_modules/'
        ]
    }).on('start', function () {
        if (!called) {
            cb();
            called = true;
        }else {
        }
    });
});

gulp.task('default', ['browser-sync']);