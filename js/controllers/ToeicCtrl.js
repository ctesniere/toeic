'use strict';

app.controller('ToeicCtrl', function ToeicCtrl($scope, $location, $filter, $http, API, arrayUtils, utils, profile) {
    $scope.utils = utils;

    $scope.listWord = [];
    $scope.nameOfPreposition = '';
    $scope.prepositions = [];
    $scope.lastWordAndPrep = [];
    $scope.point = 0;
    $scope.numberOfErrorsInThisRound = 0;

    $scope.init = function () {
        API.get().success(function (data) {
            angular.forEach(data.list_word, function (value, key) {
                angular.forEach(value.preposition, function (value, key) {
                    $scope.listWord.push({word: key, preposition: value});
                });
            });
            $scope.prepositions = arrayUtils.shuffle(data.prepositions.list);
            $scope.nameOfPreposition = arrayUtils.shuffle($scope.listWord)[0];
            utils.resetBackgroundColor($scope.prepositions);
        });
    };

    $scope.valide = function (preposition) {
        var element = document.getElementById(preposition);
        if (preposition == $scope.nameOfPreposition.preposition) {
            element.style.backgroundColor = profile.colorRed;

            $scope.lastWordAndPrep = $scope.nameOfPreposition;
            if ($scope.numberOfErrorsInThisRound < 1) {
                $scope.point = $scope.point + 1;
            }
            $scope.numberOfErrorsInThisRound = 0;
            $scope.init();
        } else {
            $scope.numberOfErrorsInThisRound++;
            element.style.backgroundColor = profile.colorRed;
        }
    };

    $scope.init();
});
