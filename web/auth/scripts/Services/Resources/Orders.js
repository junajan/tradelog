Tradelog.factory('Orders', [
	'$resource',
	function($resource) {
		return $resource($$config.api + 'order',{}, {});
	}
]);
