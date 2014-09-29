'use strict';

app.factory('profile', function() {
    return {
        "colorGreen": "#55AD10",
        "colorRed": "#632928"
    };
}).factory('API', function ($rootScope, $http) {
    var base = "data/word.json";

    return {
        get: function () {
            return $http({ cache: true, url: base, method: 'GET'});
        }
    };
}).factory('utils', function(arrayUtils, profile) {
    return {
        mySplit: function (string, nb) {
            if (!string)
                return '';

            var array = string.split('__');
            return array[nb];
        },

        resetBackgroundColor: function (prepositions) {
            for (var i = 0; i < prepositions.length; i++) {
                var element = document.getElementById(prepositions[i]);
                if (!!element)
                    element.style.backgroundColor = "white";
            }
        },

        allbackgroundColorRed: function (prepositions, prepRep) {
            for (var i = 0; i < prepositions.length; i++) {
                var element = document.getElementById(prepositions[i]);
                if (!!element) {
                    element.style.backgroundColor = profile.colorRed;
                }
            }

            if (prepRep) {
                element = document.getElementById(prepRep);
                element.style.backgroundColor = profile.colorGreen;
            }
        },

        randomKeyForObj: function (obj) {
            var keys = Object.keys(obj);
            return keys[ keys.length * Math.random() << 0];
        }
    };
}).service('arrayUtils', function() {
    this.shuffle = function (array) {
        if (!!array) {
            var m = array.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
        }
        return array;
    };
});