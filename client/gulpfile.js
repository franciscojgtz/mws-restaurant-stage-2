const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpautoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const imageminPngquant = require('imagemin-pngquant');
const imageresize = require('gulp-image-resize');
const rename = require('gulp-rename');
const gm = require('gulp-gm');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');

const paths = {
  styles: {
    src: 'sass/**/*.scss',
    dest: 'css',
  },

  js: {
    src: 'src_js/**/*.js',
    dest: 'js',
  },

  images: {
    src: 'src_img/**/*',
    dest: 'img',
  },
};

function optimizeImages() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(rename({ suffix: '_800' }))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(gulp.dest(paths.images.dest));
}

function resizeImages400() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(imageresize({ width: 400 }))
    .pipe(rename({ suffix: '_400' }))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(gulp.dest(paths.images.dest));
}


function resizeImages600() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(imageresize({ width: 600 }))
    .pipe(rename({ suffix: '_600' }))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(gulp.dest(paths.images.dest));
}

function scripts() {
  return gulp.src(paths.js.src)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));
}

function styles() {
  const plugins = [
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano(),
  ];
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.reload({
      stream: true,
    }));
}

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: ['./'],
    },
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.js.src_js, scripts);
  gulp.watch('*.html', reload);
}

exports.resizeImages400 = resizeImages400;
exports.resizeImages600 = resizeImages600;
exports.scripts = scripts;
exports.optimizeImages = optimizeImages;
exports.styles = styles;
exports.watch = watch;
