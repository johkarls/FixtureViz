
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');


module.exports = function (gulp, plugins,config) {
    
      var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
        
    ];
    
    return function (cb) {
             gulp.src('./src/styles/*.css')
            .pipe(plugins.postcss(processors))
           .pipe(plugins.concat('styles.min.css'))
            .pipe(gulp.dest('./dest/styles'));
       
            cb();
    };
};
