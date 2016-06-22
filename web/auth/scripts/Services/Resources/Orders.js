Tradelog.factory('Orders', [
	'$resource',
	function($resource) {
		return $resource($$config.api + 'order',{}, {
			getActualPrices: {
				url: $$config.api + 'actual-prices'
			}
		});
	}
]);
