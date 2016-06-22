Tradelog.controller ( "Dashboard", [
    '$scope', 'Orders', '$timeout',
    function ($scope, Orders, $timeout) {
        var ACTUAL_PRICES_INTERVAL = 5000;

    	$scope.orders = [];
    	$scope.actualPrices = {};
    	$scope.actualPricesPromise = null;

    	$scope.load = function() {
            Orders.query(function(res) {
				$scope.orders = res;
	    	});
    	};

        $scope.addOrder = function (order) {
            if(!order)
                return alert("Wrong input!");

            Orders.save(order, function(err, res) {
                $scope.load();
            });
        };


        $scope.loadActualPrices = function() {

            Orders.getActualPrices(function(res) {
                $scope.actualPrices = res;
                $timeout($scope.loadActualPrices, ACTUAL_PRICES_INTERVAL);
            });
        };


        $scope.load();
        $scope.loadActualPrices();

        $scope.$on('$destroy', function() {
            $scope.load = null;

            $timeout.cancel($scope.actualPricesPromise);
        });
    }
]);
