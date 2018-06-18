const gulp = require('gulp'),
  sass = require('gulp-sass'),
  gulpautoprefixer = require('gulp-autoprefixer'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create();

const paths = {
  styles: {
    src: 'sass/**/*.scss',
    dest: 'css',
  },
};

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

function reload() {
  browserSync.reload();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: ['./'],
    },
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch('*.html', reload);
}

exports.styles = styles;
exports.watch = watch;