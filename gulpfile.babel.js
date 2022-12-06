import gulp from "gulp";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import autoprefixer from "gulp-autoprefixer";
import bro from "gulp-bro"
import babelify from "babelify"
import ghPages from "gulp-gh-pages";
import fileinclude from "gulp-file-include";

const sass = require("gulp-sass")(require("node-sass"));

sass.compiler = require("node-sass");

const routes = {
  img: {
    src: "src/img/*",
    dest: "build/img"
  },
  html: {
    src: "src/html/*",
    dest: "build/"
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css"
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/main.js",
    dest: "build/js"
  },
  include : {
    watch: "src/html/include/*.html",
    src: "src/html/include/*.html",
    dest: "build/"
  }
};

async function reload() {
  server.reload();
}

const clean = () => del(["build/",".publish"]);

const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

const html = () =>
  gulp
    .src(routes.html.src)
    .pipe(gulp.dest("src/html"));

const img = () =>
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(routes.scss.dest));

const js = () => 
  gulp
    .src(routes.js.src)
    // .pipe(bro({
    //   transform: [
    //     babelify.configure({ presets: ["@babel/preset-env"] }),
    //     [ 'uglifyify', { global: true } ]
    //   ]
    // }))
    .pipe(gulp.dest(routes.js.dest))

const inc = () => 
  gulp.src([
      routes.html.src,
      "!" + routes.include.src
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(routes.include.dest));


const gh = () => gulp.src("build/**/*").pipe(ghPages())

const watch = () => {
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.html.src, html);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
  //gulp.watch(routes.include.watch, includeHTML);
};


const prepare = gulp.series([clean, img, inc]);
    
const assets = gulp.series([styles, js, html]);

const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets])
export const dev = gulp.series([build, live])
export const deploy = gulp.series([build, gh, clean])