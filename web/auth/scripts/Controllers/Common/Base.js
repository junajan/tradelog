Tradelog.controller ( "Base", [
    '$scope', '$rootScope', '$timeout', 'Orders',
    function ($scope, $rootScope, $timeout, Orders) {

		$rootScope.$on('$routeChangeSuccess', function(scope, current, pre) {
			$rootScope.currentTitle = current.title;
			$rootScope.currentRoute = current.originalPath ? current.originalPath.slice(1) : '';
			$rootScope.currentPath = $rootScope.currentRoute || 'home';

			$('#navbar li').removeClass('active');
			$('#navbar li.'+$rootScope.currentPath).addClass('active');
	    });
    }
]);
