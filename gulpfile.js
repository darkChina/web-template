const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

gulp.task('sass', function() {
    return (
        gulp.src('./app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./app'))
        .pipe(browserSync.reload({stream: true}))
    )
})

gulp.task('html', function() {
    return (
        gulp.src('./app/*.html')
        .pipe(browserSync.reload({stream: true}))
    )
})

gulp.task('js', function() {
    return (
        gulp.src('./app/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./app'))
        .pipe(browserSync.reload({stream: true}))
    )
})


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./app/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./app/*.html', gulp.parallel('html'))
    gulp.watch('./app/js/**/*.js', gulp.parallel('js'))
})

gulp.task('default', gulp.parallel('browser-sync', 'watch'))