var gulp = require('gulp');
var gutil = require('gulp-util');                 // For debugging gulp
var source = require('vinyl-source-stream');
var browserify = require('browserify')            // Helps in resolving dependencies
var watchify = require('watchify')                // Any change in code will get auto-reflected
var reactify = require('reactify')                // Works with browserify for converting JSX to JS


gulp.task('default', function() {
	// Run bundler
	var bundler = watchify(browserify({
		// Configurations
		entries: ['./src/app.jsx'], // Starting point for application
		transform: [reactify],      // Convert JSX to JS using reactify
		extensions: ['.jsx'],       // Look at files with extension jsx
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}));

	function build (file) {
		if (file) {
			gutil.log('Recompiling ' + file);
		}

		return bundler
			.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(source('main.js'))  // Put everything in a single file main.js after concatenation and conversion of JSX
			.pipe(gulp.dest('./'));
	};

	build();
	bundler.on('update', build)

});


/*
var react = require('gulp-react');
var babel = require('gulp-babel');
var concat = require('gulp-concat');


// Main default task
gulp.task('default', function() {
	return gulp.src('src/**')
		.pipe(babel())
		.pipe(react())
		.pipe(concat('application.js'))
		.pipe(gulp.dest('./'))
});
*/


