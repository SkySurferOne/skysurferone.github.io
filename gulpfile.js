// Includes
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cmq = require('gulp-combine-media-queries');
const minifyCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const browserSync = require('browser-sync').create();

// Config
const project = {};
project.jsSourcePath = 'js/source/';
project.jsVendorPath = project.jsSourcePath + 'vendor/';
project.jsVendor = [
			project.jsVendorPath + 'jquery.min.js',
            project.jsVendorPath + 'jquery.bxslider.js',
            project.jsVendorPath + 'jquery.waypoints.js',
            project.jsVendorPath + 'jquery.easing.js',
            project.jsVendorPath + 'jquery.debouncedresize.js',
		];

// Lint Task
gulp.task('jsLint', function() {
    return gulp.src('js/source/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});

// Compile Sass And Prefix It
gulp.task('sass', function() {
    return gulp.src('css/source/*.scss')
		//.pipe(sourcemaps.init())
			.pipe(sass({ outputStyle: 'expanded' }))
		//.pipe(sourcemaps.write({includeContent: false}))
		//.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(autoprefixer())
		//.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Compile Sass, Prefix It And Minify
gulp.task('sass-prod', function() {
    return gulp.src('css/source/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(autoprefixer())
		//.pipe(cmq({ log: false }))
		.pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('css'));

});

// Minify Css Styles
gulp.task('minify-css', function() {
	return gulp.src('css/*.css')
		/*.pipe(rename(function (path) {
			 path.basename += ".min";
		}))*/
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('css'));

});

// Concatenate & Minify JS
gulp.task('scripts', function() {

	var vendor = gulp.src(project.jsVendor)
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));

	var main = gulp.src(project.jsSourcePath + '*.js')
		.pipe(uglify())
		.pipe(gulp.dest('js'));

	return merge(vendor, main);
});

gulp.task('scripts-dev', function() {
	return gulp.src(project.jsSourcePath + '*.js')
		.pipe(uglify())
		.pipe(gulp.dest('js'))
        .pipe(browserSync.reload({ stream: true }));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Watch Files For Changes
gulp.task('watch', function() {
	 gulp.watch(project.jsSourcePath + '*.js', gulp.series('jsLint', 'scripts-dev'));
	 gulp.watch('css/source/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('jsLint', 'sass-prod', 'scripts'));
gulp.task('serve', gulp.series('default', 'browser-sync'));
gulp.task('dev', gulp.series('jsLint', 'sass', 'scripts', 'watch'));
gulp.task('dev-serve', gulp.series('dev', 'browser-sync'));
