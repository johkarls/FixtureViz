module.exports = function (gulp, plugins,config) {
    return function (cb) {
        gulp.src('./src/index.html')
        .pipe(gulp.dest('./dest/'));
            
        cb();
            
    };
};