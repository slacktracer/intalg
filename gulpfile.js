const ava = require('gulp-ava');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const gulp = require('gulp');
const nodeResolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const { rollup } = require('rollup');

let cache;

gulp.task('rollup-then-babel', function () {

  return rollup({
    cache: cache,
    entry: 'src/main.js',
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      commonjs(),
      nodeResolve({ jsnext: true })
    ]
  }).then(function (bundle) {

    cache = bundle;

    return bundle.write({
      dest: 'dist/intalg.js',
      format: 'umd',
      moduleName: 'intalg',
      sourceMap: true
    });

  });

});

gulp.task('process', [ 'rollup-then-babel' ], function () {

  gulp
    .src('dist/intalg.js')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(rename('intalg.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));

});

gulp.watch('src/**/*.js', [ 'default' ]).on('change', function (event) {

  console.log(
    'File ' + event.path + ' was ' + event.type + ', running tasks...'
  );

});

gulp.task('default', [ 'process' ], function () {

  gulp.src('tests/main.js').pipe(ava({ verbose: true }));

});
