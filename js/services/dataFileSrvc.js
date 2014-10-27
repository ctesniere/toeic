app.service('dataFileSrvc', function (httpSrvc, $q) {

    var data = null;
    var words = null;
    var translates = null;

    var init = function() {
        words = [];
        translates = [];
        angular.forEach(data.list_word, function (value) {
            angular.forEach(value.preposition, function (value, key) {
                words.push({word: key, preposition: value});
            });
            angular.forEach(value.translate, function (value, key) {
                translates.push({word: key, translate: value});
            });
        });
    };

    return {
        fetchDataFile: function() {
            if (data) {
                return data;
            }
            var deferred = $q.defer();
            httpSrvc.doGet('data/word.json')
                .then(
                function onSuccess(result) {
                    data = result;
                    deferred.resolve(result);
                },
                function onFailure(reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        },
        getWords: function() {
            if (!words) {
                init();
            }
            return words;
        },
        getTranslates: function() {
            if (!translates) {
                init();
            }
            return translates;
        }
    };

});