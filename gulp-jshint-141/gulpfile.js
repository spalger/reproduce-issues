var gulp = require('gulp');

var plugins = {
  jshint: require('gulp-jshint'),
  notify: require('gulp-notify')
};

var dir = {
  js: __dirname + '/js'
};

gulp.task('jshint', function () {
    return gulp.src([
        dir.js + '/**/*.js'
    ])
        .pipe( plugins.jshint() )
        .pipe( plugins.jshint.reporter('jshint-stylish') )
        .pipe( plugins.notify( function (file) {
            if ( file.jshint.success ) {
                // Don't show something if success
                return false;
            }

            var errors = file.jshint.results.map( function (data) {
                if ( data.error ) {
                    return "(Line " + data.error.line + ' : Col ' + data.error.character + ') ' + data.error.reason;
                }
            }).join('\n');

            return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
        }))
        .pipe( plugins.jshint.reporter('fail') );
});
