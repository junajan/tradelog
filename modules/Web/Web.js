var Web = function(app) {
    var self = this;
    var config = app.config;

    app.use(function(req, res, next) {
        req.isAuthorized = function () {
            return true;
        };

        return next();
    });

    this.getApp = function(req, res) {
        res.render('app');
    };

    this.getError404 = function(req, res) {
        return res.redirect('/');
    };

    return this;
};

module.exports = function(app) {
    return new Web(app);
};