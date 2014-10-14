var app = angular.module('app', ['ngRoute','ui.bootstrap']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/accueil.html',
                controller: 'AccueilCtrl'
            }).
            when('/Preposition', {
                templateUrl: 'partials/preposition-exo.html',
                controller: 'PrepositionExoCtrl',
                resolve: {
                    dataFile: ['dataFileSrvc',
                        function(dataFileSrvc) {
                            return dataFileSrvc.fetchDataFile();
                        }
                    ]
                }
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);