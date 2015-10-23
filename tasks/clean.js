var del = require('del');

module.exports = function (gulp, plugins, config) {
    return function (cb) {
            var delconfig = [].concat(config.paths.dest);
            del(delconfig, cb());
    };
};