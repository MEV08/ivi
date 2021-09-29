const { src, dest, watch, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat')
const browserSync = require("browser-sync").create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
// 
function browsersync() {
    browserSync.init({
        watch: true,
        server: "./src"
    });
}
function images() {
    return src('src/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/img'))
}
function scripts() {
    return src([
        'src/js/main.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream())
}
function styles() {
    return src('src/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 version'],
            grid: true
        }))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
}

function build() {
    return src([
        'src/css/style.min.css',
        'src.fonts/**/*',
        'src/js/main.min.js',
        'src/*.html',

    ], {base: 'src'})
        .pipe(dest('dist'))
}

function watching() {
    watch(['src/scss/**/*.scss'], styles)
    watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts)
    watch(['src/*.html']).on('change', browserSync.reload)
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.build = build;
exports.images = images;

exports.default = parallel(scripts, browsersync, watching);
// 
// gulp.task('pug', function(){
//     return gulp.src('src/*.pug')
//         .pipe(pug())
//         .pipe(gulp.dest('src'))
// });
// gulp.task('scss', function(){
//     return gulp.src('src/scss/**/*.scss')
//         .pipe(sass({outputStyle: 'compressed'}))
//         .pipe(gulp.dest('src/css'))
//         .pipe(browserSync.reload({stream: true}))
// });
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         watch: true,
//         server: "./src"
//     });
// });
// gulp.task('watch', function(){
//     gulp.watch('src/*.pug', gulp.parallel('pug'));
//     gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
// });
// gulp.task('default', gulp.parallel('browser-sync', 'watch'));