Tradelog.controller ( "Dashboard", [
    '$scope', 'Orders', '$timeout',
    function ($scope, Orders, $timeout) {
        var ACTUAL_PRICES_INTERVAL = 5000;

    	$scope.orders = [];
    	$scope.actualPrices = {};
    	$scope.actualPricesPromise = null;
        $scope.sum = 0;

        $scope.countSumProfit = function(orders){
            var sum = 0;
            orders.forEach(function(item) {
                if(item.close_date)
                    sum += (item.close_price - item.open_price) * item.amount;
            });
            $scope.sum = sum;
        };

    	$scope.load = function() {
            Orders.query(function(res) {
				$scope.orders = res;
                $scope.countSumProfit(res);
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
