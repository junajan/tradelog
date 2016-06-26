var express = require('express');

module.exports = function(app) {
    var config = app.config;

    var Web = require('./Web')(app);
    var Api = require('./Api')(app);

    var authRoutes = express.Router();
    var apiRoutes = express.Router();

    var unauthStatic = express.static(config.root + 'web/public');
    var authStatic = express.static(config.root + 'web/auth');

    app.use(unauthStatic);
    app.use(function(req, res, next) {
        if (!req.isAuthorized()) {
            return next();
        }
        authStatic(req, res, next);
    });

    authRoutes.get('/login', Web.isNotAuthorized, Web.getLogin);
    authRoutes.post('/login', Web.isNotAuthorized, Web.doLogin);
    authRoutes.get('/logout', Web.isAuthorized, Web.doLogout);
    authRoutes.get('*', Web.isAuthorized, Web.getApp);

    apiRoutes.get('/actual-prices', Web.isAuthorized, Api.getActualPrices);
    apiRoutes.get('/order', Web.isAuthorized, Api.getOrders);
    apiRoutes.post('/order', Web.isAuthorized, Api.postOrder);
    apiRoutes.get('/note', Web.isAuthorized, Api.getNotes);
    apiRoutes.post('/note', Web.isAuthorized, Api.postNote);

    app.use('/api', apiRoutes);
    app.use('/', authRoutes);
}