var gulp = require('gulp');
//var shelljs = require('shelljs');
var browserify = require('browserify');
var sequence = require('run-sequence');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var fs = require('fs');
gulp.task('default', function() {
    //console.log('this is default task');
    //shelljs.exec('browserify js/index.js -o js/main.js');
    //sequence('mainjs', 'watch');
    sequence('vendorjs', 'mainjs');
    // sequence('mainjs');
});

gulp.task('mainjs', function() {
    var b = browserify({
        entries: ['assets/js/index.js'],
        cache: {},
        packageCache: {},
        plugin: [watchify],
    }).external('angular').external('lodash');
    // .add('assets/js/index.js')
    var bundle = function() {
        b.bundle().pipe(fs.createWriteStream('js/main.js'));
    }
    bundle();
    b.on('update', bundle);
})

// gulp.task('watch', function() {
//     gulp.watch(['assets/js/*.js'], function() {
//         sequence('mainjs');
//     });
// });
gulp.task('vendorjs', function() {
    var b = browserify().require('./bower_components/angular/angular.js', {
        expose: 'angular'
    }).require('./bower_components/lodash/dist/lodash.js', {
        expose: 'lodash'
    }).bundle().pipe(fs.createWriteStream('js/vendor.js'));
});