// const gulp = require('gulp')
// const rollup = require('rollup-stream')
// const sourcemaps = require('gulp-sourcemaps')
// const rename = require('gulp-rename')
// const source = require('vinyl-source-stream')
// const buffer = require('vinyl-buffer')
// const babel = require('gulp-babel')
import gulp from 'gulp'
import rollup from 'rollup-stream'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import babel from 'gulp-babel'
import babelRegister from 'babel-register'

babelRegister()

gulp.task('cjs', function () {

  return rollup('rollup.config.cjs.js')
    .pipe(source('main.js', './src'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel({ presets: [ [ 'env', { targets: { node: 'current' } } ] ] }))
    .pipe(rename('intalg.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/cjs'))

})

gulp.task('iife', function () {

  return rollup('rollup.config.iife.js')
    .pipe(source('main.js', './src'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      babel({
        presets: [
          [ 'env', { targets: { browsers: [ 'last 2 versions', 'safari >= 7' ] } } ]
        ]
      })
    )
    .pipe(rename('intalg.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/iife'))

})

gulp.task('umd', function () {

  return rollup('rollup.config.umd.js')
    .pipe(source('main.js', './src'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      babel({
        presets: [
          [ 'env', { targets: { browsers: [ 'last 2 versions', 'safari >= 7' ] } } ]
        ]
      })
    )
    .pipe(rename('intalg.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/umd'))

})

gulp.task('default', [ 'iife', 'cjs', 'umd' ])
