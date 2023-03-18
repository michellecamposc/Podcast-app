const { src, dest, watch, series } = require("gulp");

//To compile css
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");
const rename = require("gulp-rename");

//Images
const imagemin = require("gulp-imagemin");

const css = (done) => {
  //Identify the style page
  src("src/scss/app.scss")
    .pipe(sass()) //Compile SASS
    .pipe(dest("build/css")); //Export in a ubication

  done();
};

const cssBuild = (done) => {
  //Identify the style page
  src("build/css/app.css")
    .pipe(rename({ suffix: ".min" }))
    .pipe(purgecss({ content: ["index.html"] }))
    .pipe(dest("build/css"))

  done();
};

const dev = () => {
  watch("src/scss/**/*.scss", css);
  // To compile you must gulp dev
  // To finish controlC
};

// Creating optimized images
const images = (done) => {
  src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));

  done();
};

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.default = series(images, css, dev);
exports.build = series(cssBuild);