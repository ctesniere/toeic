'use strict';

app.factory('wordStorage', function () {

	return {
		get: function ($scope, $http) {
            $http.get('data/word.json').success(function(data) {
                    console.log(data);
                    $scope.word = data;
                }
            );
		}
	};
});
