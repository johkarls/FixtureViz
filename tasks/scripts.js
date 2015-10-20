module.exports = function (gulp, plugins,config) {
    return function (cb) {
        gulp.src(config.paths.src + "/scripts/*.js")
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.babel())
           // .pipe(plugins.concat('all.js'))
            .pipe(plugins.sourcemaps.write("."))
            .pipe(gulp.dest(config.paths.dest + "/scripts"));
            
            cb();
    };
};