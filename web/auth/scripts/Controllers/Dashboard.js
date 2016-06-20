Tradelog.controller ( "Dashboard", [
    '$scope', 'Orders', '$timeout',
    function ($scope, Orders, $timeout) {
    	$scope.equity = [];

        $scope.addOrder = function (order) {
            console.log(order);
            if(!order)
                return alert("Wrong input!");

            console.log(Orders);
            Orders.save(order, function(err, res) {
                console.log(err, res);
            });
        };

    	$scope.load = function() {
            Orders.query(function(res) {
				$scope.orders = res;
	    	});
    	};

    	$scope.load();
        $scope.$on('$destroy', function() {
            $scope.load = null;
        });
    }
]);
