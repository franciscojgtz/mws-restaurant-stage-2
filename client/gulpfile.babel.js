import babelRegister from 'babel-register';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

const server = browserSync.create();

function clean(done) {
  del(['css']);
  del(['js']);
  done();
}

const paths = {
  styles: {
    src: 'sass/**/*.scss',
    dest: 'css',
  },

  scripts: {
    src: 'src_js/**/*.js',
    dest: 'js',
  },

  images: {
    src: 'src_img/**/*',
    dest: 'img',
  },
};

function styles() {
  const plugins = [
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano({ zindex: false }),
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

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './',
    },
  });
  done();
}

function watch() {
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
}

const dev = gulp.series(clean, styles, scripts, serve, watch);
export default dev;
