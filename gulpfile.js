var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var mqpacker = require('css-mqpacker');
var rename = require('gulp-rename');

var src = './src';
var dest = './dist';

var cssDevProcessors = [
autoprefixer({
  browsers: ['> 1%', 'last 10 versions'],
}),
mqpacker({
  sort: true,
}),
];

var cssProdProcessors = cssDevProcessors.concat([
  cssnano,
  ]);

// PUG/HTML
gulp.task('views-dev', function() {
  return gulp.src(src+'/pug/views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest(dest))
  .pipe(browserSync.stream({match: '**/*.html'}))
});
gulp.task('views-prod', function() {
  return gulp.src(src+'/pug/views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest(dest))
});

// CSS
gulp.task('css-dev', function() {
  return gulp.src(src+'/stylus/index.styl')
  .pipe(sourcemaps.init())
  .pipe(stylus({
    compress: false
  }))
  .pipe(postcss(cssDevProcessors))
  .pipe(rename('master.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(dest+'/css'))
  .pipe(browserSync.stream({match: '**/*.css'}))
});
gulp.task('css-prod', function() {
  return gulp.src(src+'/stylus/index.styl')
  .pipe(stylus())
  .pipe(postcss(cssProdProcessors))
  .pipe(rename('master.css'))
  .pipe(gulp.dest(dest+'/css'))
});

// JS
gulp.task('js-dev', function() {
  return gulp.src(src+'/index.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest(dest+'/js'))
  .pipe(browserSync.stream({match: '**/*.js'}))
});
gulp.task('js-prod', function() {
  return gulp.src(src+'/index.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest(dest+'/js'))
  .pipe(browserSync.stream({match: '**/*.js'}))
});


// Browser Sync
gulp.task('serv', function() {
  browserSync.init({
    server: {
      baseDir: dest
    },
    open: false,
    notify: false,
    reloadOnRestart: true
  })
  gulp.watch(src+'/pug/**/*.pug', ['views-dev'])
  gulp.watch(src+'/stylus/*.styl', ['css-dev'])
  gulp.watch(src+'/*.js', ['js-dev'])
});

// Main gulp.tasks
gulp.task('default', ['views-dev', 'css-dev', 'js-dev', 'serv']);
gulp.task('build', ['views-prod', 'css-prod', 'js-prod']);
