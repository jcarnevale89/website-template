const gulp = require('gulp');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mqpacker = require('css-mqpacker');
const rename = require('gulp-rename');

const src = './src';
const dest = './dist';

const cssDevProcessors = [
  autoprefixer({
    browsers: ['> 1%', 'last 10 versions'],
  }),
  mqpacker({
    sort: true,
  }),
];

const cssProdProcessors = cssDevProcessors.concat([
  cssnano,
  ]);

// PUG/HTML
gulp.task('views-dev', function() {
  return gulp.src(src+'/pug/*.pug')
  .pipe(pug())
  .pipe(gulp.dest(dest))
  .pipe(browserSync.stream({match: '**/*.html'}))
});
gulp.task('views-prod', function() {
  return gulp.src(src+'/pug/*.pug')
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
  return gulp.src(src+'/js/index.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest(dest+'/js'))
  .pipe(browserSync.stream({match: '**/*.js'}))
});
gulp.task('js-prod', function() {
  return gulp.src(src+'/js/index.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest(dest+'/js'))
  .pipe(browserSync.stream({match: '**/*.js'}))
});

// Images
gulp.task('img', function() {
  return gulp.src(src+'/img/**/*.*')
  .pipe(imagemin())
  .pipe(gulp.dest(dest+'/img'));
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
  gulp.watch(src+'/stylus/**/*.styl', ['css-dev'])
  gulp.watch(src+'/js/*.js', ['js-dev'])
});

// Main gulp.tasks
gulp.task('default', ['views-dev', 'css-dev', 'js-dev', 'img', 'serv']);
gulp.task('build', ['views-prod', 'css-prod', 'js-prod', 'img']);
