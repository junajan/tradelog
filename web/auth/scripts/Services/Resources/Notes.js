Tradelog.factory('Notes', [
	'$resource',
	function($resource) {
		return $resource($$config.api + 'note',{}, {});
	}
]);
