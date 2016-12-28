var gulp = require('gulp');
var config = require('../config').deploy;
var es = require('event-stream');
var rename = require('gulp-rename');

/* Copia o arquivos para extensão Chrome */
gulp.task('copy-files-extension', function () {
	var manifest = gulp.src('manifest.json')
		.pipe(gulp.dest(config.distDirectory));

	var background = gulp.src('background.js')
		.pipe(gulp.dest(config.distDirectory));

	return es.merge(manifest, background);
});