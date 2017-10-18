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
  return gulp.src('src/pug/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream({match: '**/*.html'}))
});
gulp.task('views-prod', function() {
  return gulp.src('src/pug/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('dist'))
});

// Stylus
gulp.task('stylus-dev', function() {
  return gulp.src('src/stylus/index.styl')
  .pipe(sourcemaps.init())
  .pipe(stylus({
    compress: false
  }))
  .pipe(postcss(cssDevProcessors))
  .pipe(rename('master.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream({match: '**/*.css'}))
});
gulp.task('stylus-prod', function() {
  return gulp.src('src/stylus/index.styl')
  .pipe(stylus())
  .pipe(postcss(cssProdProcessors))
  .pipe(rename('master.css'))
  .pipe(gulp.dest('dist/css'))
});

// JS
gulp.task('js-dev', function() {
  return gulp.src('src/js/index.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream({match: '**/*.js'}))
});
gulp.task('js-prod', function() {
  return gulp.src('src/js/index.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
});

// Vendor
gulp.task('vendor', function() {
  return gulp.src('src/vendor/*.*')
  .pipe(gulp.dest('dist/vendor'));
});

// Images
gulp.task('img', function() {
  return gulp.src('src/img/**/*.*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));
});


// Browser Sync
gulp.task('serv', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    open: false,
    notify: false,
    reloadOnRestart: true
  })
  gulp.watch('src/pug/**/*.pug', ['views-dev'])
  gulp.watch('src/stylus/**/*.styl', ['stylus-dev'])
  gulp.watch('src/js/*.js', ['js-dev'])
});

// Main gulp.tasks
gulp.task('default', ['views-dev', 'stylus-dev', 'js-dev', 'vendor', 'img', 'serv']);
gulp.task('build', ['views-prod', 'stylus-prod', 'js-prod', 'vendor', 'img']);
