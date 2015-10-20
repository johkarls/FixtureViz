module.exports = function (gulp, plugins,config) {
    return function (cb) {
        gulp.src(config.paths.src + "/*.html")
            .pipe(gulp.dest(config.paths.dest));
            
            cb();
            
    };
};