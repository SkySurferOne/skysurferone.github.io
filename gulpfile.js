// Includes
var gulp  = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cmq = require('gulp-combine-media-queries');

var minifyCss = require('gulp-clean-css');

var rename = require('gulp-rename');
var merge = require('merge-stream');

var browserSync = require('browser-sync').create();

// Config
var project = {};
project.jsSourcePath = 'js/source/';
project.jsVendorPath = project.jsSourcePath + 'vendor/';
project.jsVendor = [
			project.jsVendorPath + 'jquery.min.js',
            project.jsVendorPath + 'jquery.bxslider.js',
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
		.pipe(cmq({ log: false }))
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
	 gulp.watch(project.jsSourcePath + '*.js', ['jsLint', 'scripts-dev']);
	 gulp.watch('css/source/**/*.scss', ['sass']);
});

gulp.task('default', ['jsLint', 'sass-prod', 'scripts']);
gulp.task('dev', ['jsLint', 'sass', 'scripts', 'watch']);
gulp.task('dev-serve', ['browser-sync', 'dev']);