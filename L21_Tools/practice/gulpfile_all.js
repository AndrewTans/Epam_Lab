require('./gulp_clean');

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concatCss = require('gulp-concat-css'),
	typescript = require('gulp-typescript'),
	tslint = require('gulp-tslint'),
	sassLint = require('gulp-sass-lint');

	gulp.task('html', function() {
		return gulp.src('src/index.html')
			.pipe(gulp.dest('build/'));
	});

gulp.task('sass', function() {
	return gulp.src('src/scss/*.scss') // we choose any .sass file
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
		.pipe(sass())
		.pipe(concatCss("bundle.css")) /* put all files css in one */
		.pipe(gulp.dest('build/'));
});


gulp.task('typescript', function() {
	return gulp.src('src/js/*.ts')
		.pipe(typescript({
			noImplicitAny: true,
			outFile: 'app.js'
		}))
		.pipe(tslint({
			formatter: "verbose"
		}))
		.pipe(tslint.report())
		.pipe(gulp.dest('build/'));
});


gulp.task('default', ['clean', 'html', 'sass', 'typescript']);