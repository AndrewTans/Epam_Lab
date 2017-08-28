var gulp = require('gulp'),
	typescript = require('gulp-typescript'),
	tslint = require('gulp-tslint');

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