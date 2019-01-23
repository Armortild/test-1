var gulp         = require("gulp"),
    scss         = require("gulp-sass"),
    browserSync  = require("browser-sync"),
    autoprefixer = require('gulp-autoprefixer');

gulp.task ("browser-sync", function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task("compile", function () {
   gulp.src("app/scss/**/*.scss")
       .pipe(scss())
       .pipe(autoprefixer(['last 15 versions','> 1%','ie 8','ie 7'],{cascade:true}))
       .on("error", scss.logError)
       .pipe(gulp.dest("app/css"))
       .pipe(browserSync.reload({stream:true}))
});

gulp.task("watch", ['compile','browser-sync'], function () {
    gulp.watch("app/scss/**/*.scss", ["compile"]);

    gulp.watch("app/*.html", browserSync.reload)
});