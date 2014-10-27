'use strict';

app.service('httpSrvc', ['$http', '$q',
    function($http, $q) {
        return {
            doGet: function(url, config) {
                var deferred = $q.defer();
                $http.get(url, config).then(
                    function(result) {
                        deferred.resolve(result.data);
                    },
                    function(reason) {
                        deferred.reject(reason);
                    }
                );
                return deferred.promise;
            }
        };
    }
]);