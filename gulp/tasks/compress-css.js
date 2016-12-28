var gulp = require('gulp');
var config = require('../config').deploy;
var concat = require('gulp-concat');
var es = require('event-stream');

gulp.task('compress-css', function () {
	var theme = gulp.src('css/AdminLTE.min.css')
		.pipe(gulp.dest(config.distDirectory + 'css'));

	var css = gulp.src(config.compressCssItems)
		.pipe(concat(config.compressCssName))
		.pipe(gulp.dest(config.distDirectory + 'css'));

	return es.merge(theme, css);
});