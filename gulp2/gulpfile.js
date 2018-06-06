//处理任务
var gulp = require("gulp");
/*
常用方法
gulp.task-----定义任务
gulp.src------找到需要执行任务的文件
gulp.dest----执行任务的文件的去处
gulp.watch---观察文件是否发生变化
*/
//定义任务
gulp.task("message", function() {
    console.log(111111);
})
gulp.task('test1', function() {
    console.log('hello world222');
});
// //定义默认任务
// gulp.task('default', function() {
//     console.log('hello world');
// });

//拷贝文件
gulp.task("copyHtml", function() {
    gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});

//图片压缩
//运行 npm install gulp-imagemin --save-dev 
//引入
var imagemin = require("gulp-imagemin");
gulp.task("imageMin", function() {
    gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
});

//压缩js
//运行 npm install gulp-uglify --save-dev
//引入
var uglify = require("gulp-uglify");
// gulp.task("minify", function() {
//     gulp.src("src/js/*.js")
//         .pipe(uglify())
//         .pipe(gulp.dest("dist/js"));
// });

//sass转换为css
//运行 npm install gulp-sass --save-dev
//引入
var sass = require("gulp-sass");
gulp.task("sass", function() {
    gulp.src("src/sass/*.scss")
        .pipe(sass().on('error', sass.logError)) //打印错误日志
        .pipe(gulp.dest("dist/css"));
});

//代码合并
//运行 npm install gulp-concat --save-dev
//引入
var concat = require("gulp-concat");
gulp.task("scripts", function() {
    gulp.src("src/js/*.js")
        .pipe(concat("main.js")) //合并之后的文件名
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});

//监听文件是否发生变化
gulp.task("watch", function() {
    gulp.watch("src/js/*.js", ["scripts"]);
    gulp.watch("src/images/*", ["imageMin"]);
    gulp.watch("src/sass/*.scss", ["sass"]);
    gulp.watch("src/*.html", ["copyHtml"]);
});

//执行多个任务
//运行 gulp
gulp.task('default', ["message", "copyHtml", "imageMin", "scripts", "sass"]);