const gulp =            require('gulp');
const sass =            require('gulp-sass');
const minifyCSS =       require('gulp-clean-css');
const autoprefixer =    require('gulp-autoprefixer');
const minifyJS =        require('gulp-uglify');
const browserSync =     require('browser-sync').create();

const gutil =           require('gulp-util');

// Copy all HTML files
gulp.task('copyHTML', () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Compile Sass & Minify CSS
gulp.task('compileSASS', () => {
    return gulp.src('./src/sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'not ie <= 8'],
                cascade: false
            }))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./dist/css'));
});

// Copy all JS files
gulp.task('copyJS',() => {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'))
});

// Minify JS
gulp.task('minifyJS', (cb) => {
    gulp.src('dist/js/*.js')
        .pipe(minifyJS().on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); }))
        .pipe(gulp.dest('dist/js'));
});

// Browser Sync
gulp.task('serve', () => {
    browserSync.init({
        server: 'dist'
    })
});

gulp.task('watch', () => {
    gulp.watch('./src/*.html', ['copyHTML']);
    gulp.watch('./src/sass/**/*.scss', ['compileSASS']);
    gulp.watch('./src/js/*.js', ['copyJS', 'minifyJS']);
});