const gulp =            require('gulp');
const minifyHTML =      require('gulp-html-minifier2');
const sass =            require('gulp-sass');
const minifyCSS =       require('gulp-clean-css');
const autoprefixer =    require('gulp-autoprefixer');
const babel =           require('gulp-babel');
const minifyJS =        require('gulp-uglify');
const browserSync =     require('browser-sync').create();

// Copy all HTML files
const copyHTML = () => {
    return gulp.src('src/*.html')
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
};

// Copy facicons folder
const copyFavicons = () => {
    return gulp.src('src/facicon/**/*.*')
            .pipe(gulp.dest('dist/favicons'));
};

// Compile Sass & Minify CSS
const compileSASS = () => {
    return gulp.src('./src/sass/*.scss') // ./src/sass/**/*.scss
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'not ie <= 8'],
                cascade: false
            }))
            .pipe(minifyCSS())
            .pipe(gulp.dest('dist/css'));
};

// Compile & Minify JS
const compileJS = () => {
    return gulp.src('src/js/*.js')
            .pipe(babel({presets: ['es2015']}))
            .pipe(minifyJS({compress:true}).on('error', function (err) { console.log('ERROR: ', err.toString()); }))
            .pipe(gulp.dest('dist/js'));
};

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

exports.build = gulp.series(
    copyHTML,
    copyFavicons,
    compileSASS,
    compileJS
);