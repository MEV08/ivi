const { src, dest, watch, parallel, series } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat')
const browserSync = require("browser-sync").create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const babel = require('gulp-babel');
// 
function browsersync() {
    browserSync.init({
        watch: true,
        server: "./src"
    });
}

function cleanDist() {
    return del('dist')
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
        'src/js/app.js',
        'src/js/main.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/minjs'))
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
        'src/minjs/main.min.js',
        'src/*.html',

    ], {base: 'src'})
        .pipe(dest('dist'))
}

function watching() {
    watch(['src/scss/**/*.scss'], styles)
    watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts)
    watch(['src/*.pug'], pugToHTML)
    watch(['src/*.html']).on('change', browserSync.reload)
}

function pugToHTML() {
    return src('src/*.pug')
      .pipe(
        pug({
            pretty: true
        })
      )
      .pipe(dest('src'));
}


exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.pugToHTML = pugToHTML;

exports.build = series(cleanDist, images, build);
exports.default = parallel(scripts, browsersync, watching);
