var _ = require("lodash");

var Api = function(app) {
	var self = this;
	var config = app.config;
	var DB = app.DB;

	this.getOrders = function(req, res) {
		var limit = parseInt(req.query.limit) || null;

		DB.getData('*', "log", '1=1', 'DESC, buy_date DESC, sell_date DESC', limit, function(err, data) {
			res.json(data);
		});
	};
	
	this.postOrder = function (req, res) {
		var body = _.pick(req.body, ["ticker", "amount", "price"]);
		var data = {};
		data.amount = parseInt(body.amount);
		data.ticker = body.ticker.substr(0, 10).toUpperCase();
		data.open_price = Number(body.price);

		DB.insert("log", data, function (err, dbRes) {
			if(err) {
				console.error("Order insert:", err);
				return res.status(500).json({error: "DB issue"});
			}
			else
				res.json({ok: true});
		});
	};
	
	return this;
};

module.exports = function(app) {
    return new Api(app);
};