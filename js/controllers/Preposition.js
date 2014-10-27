'use strict';

app.controller('PrepositionExoCtrl', function ToeicCtrl($scope, $location, $filter, $http, $window, dataFile, dataFileSrvc, profile, arrayUtils, stringsUtils) {
    $scope.words = [];
    $scope.translates = [];
    $scope.prepositions = [];
    $scope.round = {
        point: 0,
        wordObj: {},
        numberErrors: 0
    };
    $scope.lastRound = {
        wordObj: {},
        translate: ''
    };
    $scope.wordFound = '';

    $scope.reset = function () {
        $scope.prepositions = arrayUtils.shuffle($scope.prepositions);
        $scope.round.wordObj = arrayUtils.shuffle($scope.words)[0];
        stringsUtils.resetBackgroundColor($scope.prepositions);
    };

    $scope.init = function () {
        $scope.translates = dataFileSrvc.getTranslates();
        $scope.words = dataFileSrvc.getWords();
        $scope.prepositions = dataFile.prepositions.list;
        $scope.reset();
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
                stringsUtils.allbackgroundColorRed($scope.prepositions, $scope.round.wordObj.preposition);
            }
        }
    };

    $scope.getTranslate = function (word) {
        var valueReturn = '';
        angular.forEach(dataFileSrvc.getTranslates(), function (value) {
            if (value.word == word) {
                valueReturn = value.translate;
            }
        });
        return valueReturn;
    };

    $scope.init();
});
