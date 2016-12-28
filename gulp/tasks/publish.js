var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('publish', function (callback) {
	return runSequence('clean', 'jshint', [ 
		'concat-lib',
		'compress-js',
		'compress-css',
		'copy-files-other'
	], 'update-version', 'copy-files-extension', 'pack', 'deploy', callback);
});
