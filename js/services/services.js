app.factory('profile', function() {
    return {
        "colorGreen": "#31708F",
        "colorRed": "#A94442"
    }
}).factory('API', function ($rootScope, $http) {
    var base = "data/word.json";

    return {
        get: function () {
            return $http({ cache: true, url: base, method: 'GET'});
        }
    }
}).factory('utils', function(arrayUtils) {
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

        randomKeyForObj: function (obj) {
            var keys = Object.keys(obj);
            return keys[ keys.length * Math.random() << 0];
        }
    }
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