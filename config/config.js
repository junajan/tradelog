var _ = require('lodash');

var modules = __dirname+"/../modules/";
var config = require("./env");

var _config = {
    api: "/api",
    root: __dirname+"/../",
    dirCore: modules+"Core/",
    dirModule: modules,
    dirWeb: modules+"Web/"
};

module.exports = _.merge(_config, config);


