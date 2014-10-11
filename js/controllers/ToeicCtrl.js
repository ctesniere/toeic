'use strict';

app.controller('ToeicCtrl', function ToeicCtrl($scope, $location, $filter, $http, $window, API, arrayUtils, utils, profile) {
    $scope.utils = utils;

    $scope.words = [];
    $scope.translates = [];
    $scope.prepositions = [];
    $scope.round = {
        point: 0,
        wordObj: '',
        numberErrors: 0
    };
    $scope.lastRound = {
        wordObj: '',
        translate: ''
    };
    $scope.wordFound = '';

    $scope.reset = function () {
        $scope.prepositions = arrayUtils.shuffle($scope.prepositions);
        $scope.round.wordObj = arrayUtils.shuffle($scope.words)[0];
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
                    angular.forEach(words.translate, function (value, key) {
                        $scope.translates.push({word: key, translate: value});
                    });
                });
                $scope.prepositions = data.prepositions.list;
                $scope.reset();
            }
        });
    };

    $scope.valide = function (preposition) {
        var element = $window.document.getElementById(preposition);

        if (preposition === $scope.round.wordObj.preposition) {
            element.style.backgroundColor = profile.colorRed;

            if ($scope.round.numberErrors < 1) {
                $scope.round.point++;
            }
            $scope.round.numberErrors = 0;
            $scope.lastRound.wordObj = $scope.round.wordObj;
            $scope.wordFound = $scope.lastRound.wordObj.word.replace('__', preposition);
            $scope.lastRound.translate = $scope.getTranslate($scope.wordFound);
            $scope.reset();
        } else {
            $scope.round.numberErrors++;
            element.style.backgroundColor = profile.colorRed;
            if ($scope.round.numberErrors == 1) {
                utils.allbackgroundColorRed($scope.prepositions, $scope.round.wordObj.preposition);
            }
        }
    };

    $scope.getTranslate = function (word) {
        var valueReturn = '';
        angular.forEach($scope.translates, function (value) {
            if (value.word == word) {
                valueReturn = value.translate;
            }
        });
        return valueReturn;
    };

    $scope.init();
});
