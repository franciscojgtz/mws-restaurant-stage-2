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
const webp = require('gulp-webp');

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

function webP300() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(webp())
    .pipe(imageresize({ width: 300 }))
    .pipe(rename({ suffix: '_300' }))
    .pipe(gulp.dest(paths.images.dest));
}

function webP350() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(webp())
    .pipe(imageresize({ width: 350 }))
    .pipe(rename({ suffix: '_350' }))
    .pipe(gulp.dest(paths.images.dest));
}

function webP400() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(webp())
    .pipe(imageresize({ width: 400 }))
    .pipe(rename({ suffix: '_400' }))
    .pipe(gulp.dest(paths.images.dest));
}

function webP450() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(webp())
    .pipe(imageresize({ width: 450 }))
    .pipe(rename({ suffix: '_450' }))
    .pipe(gulp.dest(paths.images.dest));
}

function webP500() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(webp())
    .pipe(imageresize({ width: 500 }))
    .pipe(rename({ suffix: '_500' }))
    .pipe(gulp.dest(paths.images.dest));
}

function webP550() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(webp())
    .pipe(imageresize({ width: 550 }))
    .pipe(rename({ suffix: '_550' }))
    .pipe(gulp.dest(paths.images.dest));
}

function webP600() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(webp())
    .pipe(imageresize({ width: 600 }))
    .pipe(rename({ suffix: '_600' }))
    .pipe(gulp.dest(paths.images.dest));
}

function webP800() {
  return gulp.src(`${paths.images.src}.jpg`)
    .pipe(plumber())
    .pipe(webp())
    .pipe(imageresize({ width: 800 }))
    .pipe(rename({ suffix: '_800' }))
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

function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
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

exports.webP300 = webP300;
exports.webP350 = webP350;
exports.webP400 = webP400;
exports.webP450 = webP450;
exports.webP500 = webP500;
exports.webP550 = webP550;
exports.webP600 = webP600;
exports.webP800 = webP800;
exports.resizeImages400 = resizeImages400;
exports.resizeImages600 = resizeImages600;
exports.scripts = scripts;
exports.optimizeImages = optimizeImages;
exports.styles = styles;
exports.watch = watch;
