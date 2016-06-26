Tradelog.controller ( "Notes", [
    '$scope', 'Notes',
    function ($scope, Notes) {
    	$scope.notes = [];

    	$scope.load = function() {
            Notes.query(function(res) {
				$scope.notes = res;
	    	});
    	};

        $scope.addNote = function (note) {
            if(!note || !note.note)
                return alert("Wrong input!");

            Notes.save(note, function() {
                $scope.load();
            });
        };

        $scope.load();
        $scope.$on('$destroy', function() {
            $scope.load = null;
        });
    }
]);
