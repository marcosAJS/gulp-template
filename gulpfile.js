const { src, dest, series, watch } = require('gulp')
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const connect = require('gulp-connect');

function html() {
  console.log('HTML called');
  return src('./src/index.html')
    .pipe(dest('./dist'))
    .pipe(connect.reload());
}

function javascript() {
  console.log('Javascript called');
  return src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest('./dist/assets/js'))
    .pipe(connect.reload());
}

function css() {
  console.log('CSS called');
  return src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/assets/css'))
    .pipe(connect.reload());
}

function server() {
  console.log('Server called');
  return connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
}

function init() {
  html();
  css();
  javascript();
  server()
}

exports.css = css;
exports.server = server;
exports.default = function () {
  init();
  watch('./src/js/*.js', javascript);
  watch('./src/sass/*.scss', css);
  watch('./src/index.html', html);
}