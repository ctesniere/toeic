'use strict';

app.controller('ToeicCtrl', function ToeicCtrl($scope, $location, $filter, $http, $window, API, arrayUtils, utils, profile) {
    var numberOfErrorForShowReponse = 1;

    $scope.utils = utils;

    $scope.words = [];
    $scope.nameOfPreposition = '';
    $scope.prepositions = [];
    $scope.lastWordAndPrep = [];
    $scope.point = 0;
    $scope.numberOfErrorsInThisRound = 0;

    $scope.reset = function () {
        $scope.prepositions = arrayUtils.shuffle($scope.prepositions);
        $scope.nameOfPreposition = arrayUtils.shuffle($scope.words)[0];
        utils.resetBackgroundColor($scope.prepositions);
    };

    $scope.init = function () {
        API.get().success(function (data) {
            if ($scope.words.length == 0) {
                $scope.words = [];
                angular.forEach(data.list_word, function (words) {
                    angular.forEach(words.preposition, function (value, key) {
                        $scope.words.push({word: key, preposition: value});
                    });
                });
                $scope.prepositions = data.prepositions.list;
                $scope.reset();
            }
        });
    };

    $scope.valide = function (preposition) {
        var element = $window.document.getElementById(preposition);

        if (preposition === $scope.nameOfPreposition.preposition) {
            element.style.backgroundColor = profile.colorRed;

            $scope.lastWordAndPrep = $scope.nameOfPreposition;
            if ($scope.numberOfErrorsInThisRound < 1) {
                $scope.point = $scope.point + 1;
            }
            $scope.numberOfErrorsInThisRound = 0;
            $scope.reset();
        } else {
            $scope.numberOfErrorsInThisRound++;
            element.style.backgroundColor = profile.colorRed;
            if ($scope.numberOfErrorsInThisRound == numberOfErrorForShowReponse) {
                utils.allbackgroundColorRed($scope.prepositions, $scope.nameOfPreposition.preposition);
            }
        }
    };

    $scope.init();
});
