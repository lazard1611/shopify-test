import gulp from 'gulp';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
import clean from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';

const sass = gulpSass(dartSass);

const sassFiles = [
    'src/styles/application.scss',
    'src/styles/sections/**',
];

gulp.task('dev', () => {
    return gulp.src(sassFiles)
        .pipe(sass())
        .pipe(clean({ compatibility: 'ie11' }))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest('assets'));
});

gulp.task('watch', () => {
    gulp.watch('src/styles/**/*.scss', gulp.series('dev'));
});
