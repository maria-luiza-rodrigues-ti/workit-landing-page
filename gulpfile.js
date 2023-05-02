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

gulp.task("sass", compilaSass);

function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

gulp.task("browser-sync", browser);

function watch() {
  gulp.watch("styles/scss/**/*.scss", compilaSass);
  gulp.watch("*.html").on("change", browserSync.reload);
}

gulp.task("watch", watch);
gulp.task("default", gulp.parallel("watch", "browser-sync"));
