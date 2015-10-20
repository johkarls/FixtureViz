var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp-config')();
var del = require('del');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins,config);
}


gulp.task('scripts', getTask('scripts'));
gulp.task('html', getTask('html'));
//gulp.task('styles', getTask('styles'));
gulp.task('clean', require('./tasks/clean')(gulp, del, config));

gulp.task('build', gulp.series('html' , function () {
    return browserify(
                {   entries: './src/scripts/main.js',
                    extensions: ['.jsx', '.js'],
                    debug: true
                }
            )
        .transform(babelify)
        .bundle()
        .pipe(source('all.js'))
        .pipe(gulp.dest('dest/scripts'));
}));

gulp.task('watch', gulp.series('build', function(cb) {
    gulp.watch('./src/scripts/*.jsx', gulp.series('build'));
    gulp.watch('./src/scripts/*.js',  gulp.series('build'));
    
    cb();
}));

gulp.task('default', gulp.series('watch'));

