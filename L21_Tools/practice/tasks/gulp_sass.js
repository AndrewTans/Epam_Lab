var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concatCss = require('gulp-concat-css'),
	sassLint = require('gulp-sass-lint');

	gulp.task('sass', function() {
	return gulp.src('src/scss/*.scss') // we choose any .sass file
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
		.pipe(sass())
		.pipe(concatCss("bundle.css")) /* put all files css in one */
		.pipe(gulp.dest('build/'));
});