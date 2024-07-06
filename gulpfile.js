import gulp from 'gulp';
import * as cleanSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(cleanSass)
import watch from 'gulp-watch';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';

// Таска на компаил SASS
gulp.task('sass-compile', function(){
    return gulp.src('./site/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('./site/css/'))
    .pipe(browserSync.stream())
})

// Таска на сервер
gulp.task('default', function(){
    browserSync.init({
        server: {
            baseDir: './site/'
        },
    notify: false
    })

    gulp.watch('./site/scss/**/*.scss', gulp.series('sass-compile'))
    gulp.watch('./site/*.html').on('change', browserSync.reload)
})