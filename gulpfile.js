"use strict";

// npm i gulp && npm i gulp-tinypng-extended && npm install --save-dev gulp-plumber && npm i gulp-webp && npm install --save-dev gulp-webp && npm i gulp-real-favicon

// npm i gulp
const gulp = require("gulp");

// WEBP
// npm i gulp-webp && npm install --save-dev gulp-webp
const webp = require("gulp-webp");

gulp.task("webp", () => gulp.src("webp/*.{png,jpg,jpeg}").pipe(webp()).pipe(gulp.dest("webp/webp")));

// TINYPNG
// npm i gulp-tinypng-extended && npm install --save-dev gulp-plumber
var plumber = require("gulp-plumber");
var tinypng = require("gulp-tinypng-extended");

gulp.task("tiny", function () {
  return gulp
    .src("img/*.{png,jpg,jpeg}")
    .pipe(plumber())
    .pipe(
      tinypng({
        key: "3B8F7mxVmX0d325mbKTRJ0FJLj05Rwjs",
        sigFile: "img/.tinypng-sigs",
        log: true,
      })
    )
    .pipe(gulp.dest("img/tiny/"));
});

/* FAVICON */
// npm i gulp-real-favicon
var realFavicon = require("gulp-real-favicon");
var fs = require("fs");

// File where the favicon markups are stored
var FAVICON_DATA_FILE = "faviconData.json";

var fav;
gulp.task("fav", function (done) {
  realFavicon.generateFavicon(
    {
      masterPicture: "fav/fav.png",
      dest: "fav/",
      iconsPath: "/",
      design: {
        ios: {
          pictureAspect: "noChange",
          assets: {
            ios6AndPriorIcons: true,
            ios7AndLaterIcons: true,
            precomposedIcons: true,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: "noChange",
          backgroundColor: "#da532c",
          onConflict: "override",
          assets: {
            windows80Ie10Tile: true,
            windows10Ie11EdgeTiles: {
              small: true,
              medium: true,
              big: true,
              rectangle: true,
            },
          },
        },
        androidChrome: {
          pictureAspect: "noChange",
          themeColor: "#ffffff",
          manifest: {
            display: "standalone",
            orientation: "notSet",
            onConflict: "override",
            declared: true,
          },
          assets: {
            legacyIcon: true,
            lowResolutionIcons: true,
          },
        },
      },
      settings: {
        scalingAlgorithm: "Mitchell",
        errorOnImageTooSmall: true,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done();
    }
  );
});

gulp.task("default");
