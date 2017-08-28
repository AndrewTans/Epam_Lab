require('./tasks/gulp_clean');
require('./tasks/gulp_html');
require('./tasks/gulp_sass');
require('./tasks/gulp_ts');


var gulp = require('gulp');

gulp.task('default', ['clean', 'html', 'sass', 'typescript']);