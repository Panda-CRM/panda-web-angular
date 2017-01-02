var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build-dist', function (callback) {
	return runSequence('clean', 'jshint', [ 
		'concat-lib',
		'compress-js',
		'compress-css',
		'copy-files-other'
	], callback);
});
