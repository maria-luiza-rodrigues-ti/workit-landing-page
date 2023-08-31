"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

function compilaSass() {
  return gulp
    .src("styles/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("styles/css/"))
    .pipe(browserSync.stream());
}

function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

function watch() {
  gulp.watch("styles/scss/**/*.scss", compilaSass);
  gulp.watch("*.html").on("change", browserSync.reload);
}

exports.compilaSass = compilaSass;
exports.browser = browser;
exports.watch = watch;

gulp.task("default", gulp.parallel(compilaSass, browser, watch));
