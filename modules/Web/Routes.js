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

    authRoutes.get('*', Web.getApp);

    apiRoutes.get('/actual-prices', Api.getActualPrices);
    apiRoutes.get('/order', Api.getOrders);
    apiRoutes.post('/order', Api.postOrder);

    app.use('/api', apiRoutes);
    app.use('/', authRoutes);
}