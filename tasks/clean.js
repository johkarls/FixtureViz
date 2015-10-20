module.exports = function (gulp, del,config) {
    return function (cb) {
            var delconfig = [].concat(config.paths.dest);
            del(delconfig, cb());
    };
};